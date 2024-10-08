import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateSignUpDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
