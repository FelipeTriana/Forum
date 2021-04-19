import { Module } from '@nestjs/common';
import { VerifytokenController } from './verifytoken.controller';
import { JwtModule } from '@nestjs/jwt';
import { VerifyTokenService } from './verifytoken.service';



@Module({
  imports: [
    JwtModule.register({
      secret: '50f14-J50Nw3bT0k3n'
    }
    )
  ],
  controllers: [VerifytokenController],
  providers: [VerifyTokenService],
  exports: [VerifyTokenService ]
})

export class VerifytokenModule {}