import { PartialType } from '@nestjs/mapped-types';
import { CreateResellerDto } from './create-reseller.dto';

export class UpdateResellerDto extends PartialType(CreateResellerDto) {}
