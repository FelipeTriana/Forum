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
    if (body.image) {
      const fs = require('fs');
      try {
        await fs.unlinkSync(publication.image);
        console.log('Imagen eliminada');
      } catch (err) {
        console.error('La publicacion no tiene imagen');
      }
    }
    this.publicationsRepo.merge(publication, body);
    return this.publicationsRepo.save(publication);
  }

  async delete(id: number) {
    let publication = await this.findOne(id);
    const fs = require('fs');
    try {
      await fs.unlinkSync(publication.image);
      console.log('Imagen eliminada');
    } catch (err) {
      console.error('La publicacion no tiene imagen');
    }
    await this.publicationsRepo.delete(id);
    return true;
  }
}
