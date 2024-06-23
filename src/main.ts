import helmet from 'helmet';
import * as _ from 'lodash';
import cluster from 'node:cluster';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

const CLUSTER_ENV_VARS: any[] = [];
const numCPUs: number = Number(
  process.env.WORKERS || os.availableParallelism(),
);

async function buildDocument(PORT: number) {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const file = fs.readFileSync(packageJsonPath);
  const { author, name, description, version } = JSON.parse(file.toString());
  const { name: authorName, email, url } = author;

  const documentBuilder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, url, email)
    .addServer(`http://localhost:${PORT}`, 'Local Development Server')
    .build();
  return documentBuilder;
}

async function createCluster(app: INestApplication, PORT: number) {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      const envClone = _.clone(process.env);
      envClone.PORT = (PORT + i).toString();

      const worker = cluster.fork(envClone);
      CLUSTER_ENV_VARS[worker.id] = envClone;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      const new_worker = cluster.fork(CLUSTER_ENV_VARS[worker.id]);
      CLUSTER_ENV_VARS[new_worker.id] = CLUSTER_ENV_VARS[worker.id];
    });
  } else {
    await app.listen(PORT, () => {
      console.log('Application is listening to port %s', PORT);
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get<EnvService>(EnvService);
  const PORT = Number(envService.get('PORT'));

  app.use(helmet());
  app.enableCors();

  // Swagger module set up
  const documentBuilder = await buildDocument(PORT);
  const swagger = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, swagger);

  // Create Cluster
  await createCluster(app, PORT);
}

bootstrap().catch((error) => {
  console.error(error);
});
