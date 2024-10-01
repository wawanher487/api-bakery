import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateResellerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsDateString()
    @IsOptional()
    created_at?: Date;

    @IsDateString()
    @IsOptional()
    updated_at?: Date;
}


export class ResponReseller extends PartialType(CreateResellerDto) {}
