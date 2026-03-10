
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import {RegisterDto} from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService,
  ) {}

  
  async register(registerDto: RegisterDto){
    const {username, password} = registerDto;

    const existingUser = await this.prisma.users.findUnique( {where: {username}, })
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.users.create({
      data: {
        username, 
        //This line means const data = {username: username,} in Javascript, if same name, can write in shorthand like this.
        userPassword: hashedPassword, 
        // Here is what userPassword: hashedPassword means: 
        // "Take the value inside the variable hashedPassword, and save it into the database column 
        // named userPassword."
      },
    });
    return {
      message: 'User registered successfully',
      user:{
        id: user.id,
        name: user.username,
      }
    };
  }

  async validateUser(username: string, pass: string): Promise<any>{
    const user = await this.prisma.users.findUnique({ where: {username} });
    if(user && (await bcrypt.compare(pass, user.userPassword))){ 
      //.userPassword must exactly match the field name defined in schema.prisma file.
      const {userPassword, ...result} = user;
      // {userPassword, ...result} = user; is combination of Object Destructuring and the Rest Operator (...).
      //  The line means "Take the "userPassword" property out of the "user object" and take all the rest of the properties and bundle them into a new object called "result". "
      //  So, this line ensures that whoever called validateUser gets the safe, password-free(or no password contain on) user data.
      return result;
      // Therefore, the result will contain only other attributes, it will not contain the password . For example,
      // {
        //   id: 1,
        //   username: "SomSee",
      // } 
    }
    return null;
  }

  async login(loginDto: LoginDto){
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if(!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload), //Generate the JWT string and return to Clients.
    };
  }

}
