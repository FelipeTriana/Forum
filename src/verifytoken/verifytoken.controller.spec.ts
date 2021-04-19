import { Test, TestingModule } from '@nestjs/testing';
import { VerifytokenController } from './verifytoken.controller';

describe('VerifytokenController', () => {
  let controller: VerifytokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifytokenController],
    }).compile();

    controller = module.get<VerifytokenController>(VerifytokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
