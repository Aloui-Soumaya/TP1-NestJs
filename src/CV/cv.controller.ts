import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) { }
  @Get()
  async findAll(): Promise<CvEntity[]> {
    return await this.cvService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.findOne(id);
  }
  @Post()
  async create(@Body() cv: AddCvDto): Promise<CvEntity> {
    return await this.cvService.create(cv);
  }
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() cv: UpdateCvDto): Promise<CvEntity> {
    return await this.cvService.update(id, cv);

  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CvEntity> {
    return await this.cvService.remove(id);
  }

}
