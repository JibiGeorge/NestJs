import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpData: SignUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpData;

        const emailExist = await this.userModel.find({ email })
        if (!emailExist) {
            throw new UnauthorizedException("Email already Exist")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashPassword
        })

        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }

    async login(loginData: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginData;

        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException("Invalide Email or password")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({ id: user._id })
        return { token };
    }
}
