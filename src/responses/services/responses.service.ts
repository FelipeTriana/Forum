import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';  
import { Repository } from 'typeorm';             
import { Response } from './../entities/responses.entity';


@Injectable()
export class ResponsesService {

    constructor(
        @InjectRepository(Response) private responsesRepo: Repository<Response> //?????
    ){}

    findAll(){
        return this.responsesRepo.find();
    }

    findAllBy(publication_id: number){
        return this.responsesRepo.find({ where : {publication_id}});
    }

    findOne(id: number){
        return this.responsesRepo.findOne(id);
    }

    create(body: any){
        const newResponse = this.responsesRepo.create(body);
        return this.responsesRepo.save(newResponse);
    }

    async update(id: any, body: any){
        const response = await this.responsesRepo.findOne(id);
        this.responsesRepo.merge(response, body);
        return this.responsesRepo.save(response);
    }

    async delete(id: number){
        await this.responsesRepo.delete(id);
        return true;
    }

    

}
