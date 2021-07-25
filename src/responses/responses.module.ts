import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';
import { Response } from './entities/responses.entity';
import { JwtModule } from '@nestjs/jwt';
import { VerifyTokenService } from '../verifytoken/verifytoken.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    JwtModule.register({
      secret: '50f14-J50Nw3bT0k3n',
    }),
  ],
  providers: [ResponsesService, VerifyTokenService],
  controllers: [ResponsesController],
  exports: [VerifyTokenService],
})
export class ResponsesModule {}
