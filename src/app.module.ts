import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsModule } from './publications/publications.module';
import { VerifytokenModule } from './verifytoken/verifytoken.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.30.62',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'publications',
      entities: ['dist/**/*.entity{.ts,.js}'], //Expresion regular para encontrar todas las entidades
      synchronize: false, //No autosincronizado(migraciones)
      retryDelay: 3000, // En cada intento de conexion demora 3 ms
      retryAttempts: 10, //10 intentos de conexion
    }),
    PublicationsModule,
    VerifytokenModule,
    ResponsesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
