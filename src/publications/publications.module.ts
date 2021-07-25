import { Module } from '@nestjs/common';
import { PublicationsService } from './services/publications.service';
import { PublicationsController } from './controllers/publications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';

import { VerifyTokenService } from '../verifytoken/verifytoken.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication]),
    JwtModule.register({
      secret: '50f14-J50Nw3bT0k3n',
    }),
  ],
  providers: [PublicationsService, VerifyTokenService],
  controllers: [PublicationsController],
  exports: [VerifyTokenService],
})
export class PublicationsModule {}
