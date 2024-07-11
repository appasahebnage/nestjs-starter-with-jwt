import { JwtGuard } from './jwt.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuard()).toBeDefined();
  });
});
