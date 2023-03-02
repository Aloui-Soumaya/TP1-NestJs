import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MajusPipe } from './MajusPipe';
@Controller('Custom')
export class CustomController {
    constructor() {
    }
    @Post()
    customPipePost(@Body(MajusPipe) body): string {
        return body;
    }

}
