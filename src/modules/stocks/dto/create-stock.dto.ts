import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStockDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    lokasi_gudang: string;

    @IsOptional()
    @IsDateString()
    last_updated: Date;
}

export class ResponsStock extends PartialType(CreateStockDto) {}
