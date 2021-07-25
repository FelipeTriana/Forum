import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponsesService } from './../services/responses.service';
import { VerifyTokenService } from '../../verifytoken/verifytoken.service';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('responses')
export class ResponsesController {
  constructor(
    private responsesService: ResponsesService,
    private verifyTokenService: VerifyTokenService,
  ) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const token = req.headers['authorization'];
      const verified = await this.verifyTokenService.verifyToken(token);
      let resultado = await this.responsesService.findAll();
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'Para ver las respuestas debe estar logueado. Token invalido',
      });
    }
  }

  @Get(':publication_id')
  async getBy(
    @Param('publication_id') publication_id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const token = req.headers['authorization'];
      const verified = await this.verifyTokenService.verifyToken(token);
      let resultado = await this.responsesService.findAllBy(publication_id);
      return res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({
        error: 'Para ver esta publicacion debe estar logueado. Token invalido',
      });
    }
  }

  @Post()
  async create(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      const token = req.headers['authorization'];
      const verified = await this.verifyTokenService.verifyToken(token);
      console.log(verified);
      body.author = verified.user;
      let resultado = await this.responsesService.create(body);
      return res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const token = req.headers['authorization'];
      let verified = await this.verifyTokenService.verifyToken(token);
      console.log(verified);
      let target = await this.responsesService.findOne(id);
      if (target.author === verified.user) {
        let resultado = await this.responsesService.update(id, body);
        return res.status(200).json(resultado);
      } else {
        const error = 'No puede editar una publicacion de otro usuario';
        return res.status(401).json(error);
      }
    } catch (error) {
      res.status(400).json({
        error: 'No puede editar esta publicacion. Token invalido',
      });
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const token = req.headers['authorization'];
      let verified = await this.verifyTokenService.verifyToken(token);
      let target = await this.responsesService.findOne(id);
      if (target.author === verified.user) {
        let resultado = await this.responsesService.delete(id);
        return res.status(200).json(resultado);
      } else {
        const error = 'No puede eliminar una publicacion de otro usuario';
        return res.status(401).json(error);
      }
    } catch (error) {
      res.status(400).json({
        error: 'No puede eliminar esta publicacion. Token invalido',
      });
    }
  }
}
