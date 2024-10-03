import { IsNotEmpty, IsString } from 'class-validator';

export class NetworkDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  rpcUrl!: string;

  @IsString()
  @IsNotEmpty()
  currencySymbol!: string;

  @IsString()
  @IsNotEmpty()
  blockExplorer!: string;
}
