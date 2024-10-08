import { PartialType } from '@nestjs/mapped-types';
import {  CreateSignUpDto } from './create-signUp.dto';

export class UpdateSignUpDto extends PartialType(CreateSignUpDto) {}
