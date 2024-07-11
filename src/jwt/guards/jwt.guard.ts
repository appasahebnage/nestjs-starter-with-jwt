import { AuthGuard } from '@nestjs/passport';
import { JwtStrategyType } from '../types';

export class JwtGuard extends AuthGuard(JwtStrategyType) {}
