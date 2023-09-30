import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signUp')
    signup(
        @Body()
        signUpData: SignUpDto
    ): Promise<{ token: string }> {
        return this.authService.signUp(signUpData)
    }

    @Post('/login')
    login(
        @Body()
        loginData: LoginDto
    ): Promise<{ token: string }> {
        return this.authService.login(loginData)
    }
}
