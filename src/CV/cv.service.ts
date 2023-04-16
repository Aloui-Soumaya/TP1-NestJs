import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {

  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>
  ) { }
  async findAll(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }
  async findOne(id: number): Promise<CvEntity> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException("le cv d'id ${id} n'existe pas")
    }
    return cv;
  }
  async create(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);

  }
  async update(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    const newCv = await this.cvRepository.preload({
      id,
      ...cv
    })
    return await this.cvRepository.save(newCv);
  }
  async remove(id: number): Promise<CvEntity> {
    const cvToDelete = await this.cvRepository.findOne({ where: { id } });
    if (!cvToDelete) {
      throw new NotFoundException("Le cv d'id ${id} n'existe pas");
    }

    return await this.cvRepository.remove(cvToDelete);
  }

}

