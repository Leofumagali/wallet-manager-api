import { IsNotEmpty, IsString } from "class-validator";

export class AddWalletDTO {
  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  network!: string;
}