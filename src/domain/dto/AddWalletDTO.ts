import { IsNotEmpty, IsString } from "class-validator";
import { NetworkDTO } from "./NetworkDTO";

export class AddWalletDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  network!: NetworkDTO;
}