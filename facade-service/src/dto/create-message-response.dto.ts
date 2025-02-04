import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageResponseDto {
  @ApiProperty({
    description: 'Uuid',
    example: 'This is new uuid',
    name: 'uuid',
    required: true,
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty({
    description: 'Message',
    example: 'This is new message',
    name: 'message',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
