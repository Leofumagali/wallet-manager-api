import { IsNotEmpty, IsString } from "class-validator";

export class UpdateWalletDTO {
  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  network!: string;
}