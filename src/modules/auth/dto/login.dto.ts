import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}