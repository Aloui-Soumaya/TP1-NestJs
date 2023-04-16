import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from './entities/skill.entity';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) { }

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll(): Promise<SkillEntity[]> {
    return this.skillService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SkillEntity> {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.remove(id);
  }
}
