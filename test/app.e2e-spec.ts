import * as pactum from 'pactum';
import { EnvService } from 'src/env/env.service';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const config = moduleFixture.get<EnvService>(EnvService);

    const port = config.get('PORT');
    const baseUrl = `http://localhost:${port}`;

    await app.init();
    await app.listen(port);
    pactum.request.setBaseUrl(baseUrl);
    pactum.request.setDefaultTimeout(30000);
  });

  afterAll(async () => {
    app.close();
  });

  it('/ (GET)', () => {
    return pactum
      .spec()
      .get('/')
      .expectStatus(200)
      .expectBody({ message: 'Welcome to nestjs-starter-with-jwt!' });
  });
});
