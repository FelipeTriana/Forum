import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //Uso del patron data mapper
import { Repository } from 'typeorm'; //

import { Publication } from './../entities/publication.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepo: Repository<Publication>,
  ) {}

  findAll() {
    return this.publicationsRepo.find();
  }

  findOne(id: number) {
    return this.publicationsRepo.findOne(id);
  }

  create(body: any) {
    const newPublication = this.publicationsRepo.create(body);
    return this.publicationsRepo.save(newPublication);
  }

  async update(id: number, body: any) {
    const publication = await this.publicationsRepo.findOne(id);
    this.publicationsRepo.merge(publication, body);
    return this.publicationsRepo.save(publication);
  }

  async delete(id: number) {
    await this.publicationsRepo.delete(id);
    return true;
  }
}
