import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(@InjectRepository(SkillEntity)
  private skillRepository: Repository<SkillEntity>) { }
  async create(createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return await this.skillRepository.save(createSkillDto);
  }

  async findAll(): Promise<SkillEntity[]> {
    return await this.skillRepository.find();
  }

  async findOne(id: number): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException("le skill d'id ${id} n'existe pas")
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<SkillEntity> {
    const skill = await this.skillRepository.preload({
      id,
      ...updateSkillDto
    })
    return await this.skillRepository.save(skill);
  }

  async remove(id: number): Promise<SkillEntity> {
    const skillToDelete = await this.skillRepository.findOne({ where: { id } });
    if (!skillToDelete) {
      throw new NotFoundException("Le skill d'id ${id} n'existe pas");
    }

    return await this.skillRepository.remove(skillToDelete);
  }

}

