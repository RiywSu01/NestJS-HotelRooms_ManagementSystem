import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}  
  private readonly logger = new Logger('RoomsService');

  //createRoom
  async create(createRoomDto: CreateRoomDto){
    this.logger.log(`Executing ${createRoomDto.name}...`);
    try{
      const newRoom = {
        id: createRoomDto.id,
        name: createRoomDto.name,
        description: createRoomDto.description,
        capacity: createRoomDto.capacity,
        price_per_night: createRoomDto.price_per_night,
        image_url: createRoomDto.image_url,
        is_active: createRoomDto.is_active ?? true,
        created_at: createRoomDto.created_at,
        updated_at: createRoomDto.updated_at,
      }    
      return await this.prisma.rooms.create({data:newRoom});
    }catch(error){
      this.logger.error(`The create() have an error.`);
      throw new NotFoundException('The information is not provided.');
    }
  }
  //retreive all rooms for database
  async findAll() {
    this.logger.log(`Fetching all rooms.`);
    const allrooms = await this.prisma.rooms.findMany();
    if(!allrooms){
      throw new NotFoundException('There is no rooms.');
    }
    return allrooms;
  }

  //retreive one room from database
  async findARoom(id: number) {
    this.logger.log(`Fetching room id = ${id}`);
    const room = await this.prisma.rooms.findUnique({where:{ id }});
    if(!room){ //If room didnt exist
      this.logger.warn(`Room ${id} not found.`);
      throw new NotFoundException(`Room ${id} not found.`);
    }
  }

  //update the room status to be FALSE
  async disable(id: number) {
    this.logger.log(`Disabling room id = ${id}`);
    try{
      await this.prisma.rooms.update({ where:{ id: id }, data:{is_active: false},}
      );
    }catch(error){
      this.logger.error(`Error found when disabling room id = ${id}`);
      throw new NotFoundException(`Room ${id} not found.`);
    }
  }

  //update the room status to be TRUE
  async enable(id: number){
    this.logger.log(`Enabling room id = ${id}`);
    try{
      await this.prisma.rooms.update({ where:{ id: id }, data:{is_active: true},}
      );
    }catch(error){
      this.logger.error(`Error found when enabling room id = ${id}`);
      throw new NotFoundException(`Room ${id} not found.`);
    }
  }

  async delete(id:number){
    this.logger.log(`Deleted room id = ${id}`);
    try{
      await this.prisma.rooms.delete({ where: { id: id } })
    }catch(error){
      this.logger.error(`Error found when deleting room id = ${id}`);
      throw new NotFoundException(`Room ${id} not found.`);
    }
  }

}
