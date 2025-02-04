import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message',
    example: 'This is new message',
    name: 'message',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
