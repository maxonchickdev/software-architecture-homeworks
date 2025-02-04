import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SaveMessageDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
