import * as pactum from 'pactum';
import { EnvService } from 'src/env/env.service';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateUserRequestDto } from '@src/user/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    const config = moduleFixture.get<EnvService>(EnvService);

    const port = config.get('PORT');
    const baseUrl = `http://localhost:${port}`;

    await app.init();
    await app.listen(port);
    await prisma.cleanDatabase();

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

  describe('/health', () => {
    it('/ready (GET)', async () => {
      return await pactum.spec().get(`/health/ready`).expectStatus(204);
    });
  });

  describe('/user', () => {
    describe('/ (POST)', () => {
      it('should create a new user', async () => {
        const dto: CreateUserRequestDto = {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          companyName: 'Test',
          password: 'XXXXXXXX',
        };

        await pactum
          .spec()
          .post('/user')
          .withBody(dto)
          .expectStatus(201)
          .expectJsonLike({
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            companyName: dto.companyName,
          })
          .returns('');
      });
    });
  });

  describe('/auth', () => {
    describe('/signin (POST)', () => {
      it('should sign in a user', async () => {
        const dto = {
          email: 'test@example.com',
          password: 'XXXXXXXX',
        };

        await pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          // .expectJsonLike({
          //   email: dto.email,
          // })
          .stores('accessToken', 'tokens.accessToken')
          .returns('');
      });
    });
  });

  describe('/user', () => {
    describe('/me (GET)', () => {
      it('should get the current user', async () => {
        await pactum
          .spec()
          .get('/user/me')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .expectStatus(200)
          .expectJsonLike({
            email: 'test@example.com',
          })
          .returns('');
      });
    });
  });
});
