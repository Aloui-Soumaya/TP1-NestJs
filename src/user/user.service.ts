import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) { }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("le user d'id ${id} n'existe pas")
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
    })
    if (!user) {
      throw new NotFoundException("le user d'id ${id} n'existe pas")
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
