import { Container } from "inversify";
import { WalletService } from "../../domain/services/WalletService";
import { WalletRepository } from "../../infra/repositories/WalletRepository";
import { TYPES } from "./types";
import { WalletController } from "../../api/controllers/WalletController";

const container = new Container();

container.bind<WalletService>(TYPES.WalletService).to(WalletService);
container.bind<WalletRepository>(TYPES.WalletRepository).to(WalletRepository);
container.bind<WalletController>(TYPES.WalletController).to(WalletController);

export { container };