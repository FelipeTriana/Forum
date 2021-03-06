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
  UploadedFiles,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PublicationsService } from './../services/publications.service';
import { VerifyTokenService } from '../../verifytoken/verifytoken.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file-upload.utils';

@Controller('publications')
export class PublicationsController {
  constructor(
    private publicationsService: PublicationsService,
    private verifyTokenService: VerifyTokenService,
  ) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const token = req.headers['authorization'];
      const verified = await this.verifyTokenService.verifyToken(token);
      console.log(verified);
      let resultado = await this.publicationsService.findAll();
      return res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({
        error: 'Para ver las publicaciones debe estar logueado. Token invalido',
      });
    }
  }

  @Get(':id')
  async getOne(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const token = req.headers['authorization'];
      const verified = await this.verifyTokenService.verifyToken(token);
      console.log(verified);
      let resultado = await this.publicationsService.findOne(id);
      return res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({
        error: 'Para ver esta publicacion debe estar logueado. Token invalido',
      });
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @UploadedFile() file,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const token = req.headers['authorization'];
      const verified = await this.verifyTokenService.verifyToken(token);
      console.log(verified);
      console.log(file.path);
      body.image = file.path;
      body.name = verified.user;
      console.log(body);
      body.fullname = `${verified.name} ${verified.lastname}`;
      let resultado = await this.publicationsService.create(body);
      return res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({
        error,
      });
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
      let test = await this.publicationsService.findOne(id);
      if (test.name === verified.user) {
        console.log(`${test.name} y ${verified.user} son iguales`);
        let resultado = await this.publicationsService.update(id, body);
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
      console.log(verified);
      let test = await this.publicationsService.findOne(id);
      if (test.name === verified.user) {
        console.log(`${test.name} y ${verified.user} son iguales`);
        let resultado = await this.publicationsService.delete(id);
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

  /*@Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
              destination: './uploads',
              filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            
          }),
      ) 
      uploadSingle(@UploadedFile() file, @Res() res: Response) {
        res.status(200).json({
             file
        });
      }*/
}
