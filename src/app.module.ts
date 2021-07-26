import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsModule } from './publications/publications.module';
import { VerifytokenModule } from './verifytoken/verifytoken.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    retryDelay: 3000, 
    retryAttempts: 10
    }),
    PublicationsModule,
    VerifytokenModule,
    ResponsesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
