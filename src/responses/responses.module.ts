import { Module } from '@nestjs/common';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';
import { Response } from './entities/responses.entity';


@Module({
  providers: [ResponsesService],
  controllers: [ResponsesController]

})
export class ResponsesModule {}
