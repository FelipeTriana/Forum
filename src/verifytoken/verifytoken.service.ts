import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyTokenService {
    constructor(
        private jwt: JwtService
    ) { }

    async verifyToken(token): Promise<any> {
        

            let cleanToken = token.replace('Bearer ', '').trim();
            const verified = await this.jwt.verifyAsync(cleanToken)
            return verified;
        
    }

}
