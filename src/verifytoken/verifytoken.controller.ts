import { Controller, Get, Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { VerifyTokenService } from './verifytoken.service'

@Controller('verifytoken')
@Injectable()
export class VerifytokenController {
    constructor(
        private verifyTokenService: VerifyTokenService
    ) { }

    @Get()
    async verifyToken(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const token = req.headers['authorization'];
            const verified = await this.verifyTokenService.verifyToken(token);

            return res.status(200).json(verified)
        } catch (error) {

            res.status(400).json({
                error: 'Token invalido'

            })
        }
    }
}