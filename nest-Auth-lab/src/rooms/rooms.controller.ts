import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findARoom(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/disable')
  update(@Param('id') id: string) {
    return this.roomsService.disable(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.roomsService.enable(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  delete(@Param('id') id: string) {
    return this.roomsService.delete(+id);
  }
}
