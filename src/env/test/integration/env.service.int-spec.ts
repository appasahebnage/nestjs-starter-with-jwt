import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { EnvService } from '../../../env/env.service';

describe('Env Service Int', () => {
  let envService: EnvService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvService, ConfigService],
    }).compile();

    envService = module.get<EnvService>(EnvService);
  });

  describe('get', () => {
    it('should return the value of the environment variable', () => {
      expect(envService.get('NODE_ENV')).toBe('test');
    });

    it('should return undefined if the environment variable is not set', () => {
      delete process.env.NODE_ENV;
      expect(envService.get('NODE_ENV')).toBeUndefined();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
