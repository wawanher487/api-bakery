import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSignUpDto } from './dto/create-signUp.dto';
import { UpdateSignUpDto } from './dto/update-signUp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refreshToken.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpData: CreateSignUpDto) {
    const emailInUse = await this.userRepository.findOne({
      where: { email: signUpData.email },
    });

    if (emailInUse) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(signUpData.password, 10);

    const user = await this.userRepository.create({
      ...signUpData,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(creadential: LoginDto) {
    const { email, password } = creadential;

    //cek email
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //generate token
    return this.generateUserToken(user);
  }

  async generateUserToken(user: User) {
    const accessToken = this.jwtService.sign(
      { userId: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );

    const refreshToken = uuid4();

    await this.storeRefreshToken(refreshToken, user);

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, user: User) {
    //tanggal kadaluwarsa
    const newExpiryDate = new Date();
    newExpiryDate.setHours(newExpiryDate.getHours() + 1);
  

    // cari refresh token
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { user },
    });

    if (refreshToken) {
      //jika ada, update token
      refreshToken.token = token;
      refreshToken.expiryDate = newExpiryDate;
    } else {
      //jika tidak ada, buat token
      const newRefreshToken = this.refreshTokenRepository.create({
        token,
        expiryDate : newExpiryDate,
        user,
      });

      return await this.refreshTokenRepository.save(newRefreshToken);
    }

    return await this.refreshTokenRepository.save(refreshToken);
  }

  async refreshToken(refreshToken: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    //Mencari token yang valid
    const data = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken, expiryDate: MoreThan(new Date()) },
    });

    //jika token tidak ditemukan
    if (!data) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.jwtService.sign(
      { userId: data.user.id, },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '7 days',
      },
    );

    if(data) {
      data.token = uuid4();
      data.expiryDate = expiryDate;
    }

   await this.refreshTokenRepository.save(data);

   return { accessToken, refreshToken: data.token };
  }

  // async storeRefreshToken(token: string, user: User) {
  //   //tanggal kadaluwarsa
  //   const newExpiryDate = new Date();
  //   newExpiryDate.setHours(newExpiryDate.getHours() + 1);
  //   const expiryDate = new Date();
  //   expiryDate.setDate(expiryDate.getDate() + 7);

  //   // cari refresh token
  //   const refreshToken = await this.refreshTokenRepository.findOne({
  //     where: { user },
  //   });

  //   console.log(refreshToken);

  //   if (refreshToken) {
  //     //jika ada, update token
  //     refreshToken.token = token;
  //     refreshToken.expiryDate = expiryDate;
  //   } else {
  //     //jika tidak ada, buat token
  //     const newRefreshToken = this.refreshTokenRepository.create({
  //       token,
  //       expiryDate : newExpiryDate,
  //       user,
  //     });

  //     return await this.refreshTokenRepository.save(newRefreshToken);
  //   }

  //   return await this.refreshTokenRepository.save(refreshToken);
  // }

  // async refreshToken(refreshToken: string) {
  //   //Mencari token yang valid
  //   const token = await this.refreshTokenRepository.findOne({
  //     where: { token: refreshToken, expiryDate: MoreThan(new Date()) },
  //   });

  //   //jika token tidak ditemukan
  //   if (!token) {
  //     throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  //   }

  //   //generate token
  //   return this.generateUserToken(token.user);
  // }


  async findAll() {
    const users = await this.userRepository.find({relations: ['refreshToken']});

    if(!users) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateSignUpDto: UpdateSignUpDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
