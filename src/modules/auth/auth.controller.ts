import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignUpDto } from './dto/create-signUp.dto';
import { WebResponse } from 'src/common/model/web.model';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() createSignUp: CreateSignUpDto,
  ): Promise<WebResponse<any>> {
    try {
      const data = await this.authService.signUp(createSignUp);

      return {
        success: true,
        data: data,
        message: 'User created successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: err.message,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('login')
  async login(@Body() creadential: LoginDto): Promise<any> {
    try {
      const data = await this.authService.login(creadential);

      return {
        success: true,
        accessToken: data,
        message: 'login success',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: err.message,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('refresh')
  async refreshToken(@Body() refreshToken: RefreshTokenDto): Promise<any> {
    try {
      const data = await this.authService.refreshToken(
        refreshToken.refreshToken,
      );
      return {
        success: true,
        accessToken: data,
        message: 'refresh token success',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: err.message,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
