import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateMessageResponseDto } from './dto/create-message-response.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('facade')
@Controller('facade')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new message' })
  @ApiBody({
    description: 'Create new message',
    type: CreateMessageDto,
  })
  @ApiCreatedResponse({
    description: 'New message created successfully',
    type: CreateMessageResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'An error occured',
  })
  async receiveMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<CreateMessageResponseDto> {
    return await this.appService.processMessage(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiOkResponse({
    description: 'Received responses from logging and messages microservices',
  })
  async getAllMessages(): Promise<string> {
    return await this.appService.fetchAllData();
  }
}
