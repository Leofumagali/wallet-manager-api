import { Router } from "express";
import { WalletController } from "../../api/controllers/WalletController";
import { dtoValidationMiddleware } from "../../infra/middlewares/dtoValidationMiddleware";
import { AddWalletDTO } from "../../domain/dto/AddWalletDTO";
import { UpdateWalletDTO } from "../../domain/dto/UpdateWalletDTO";
import { container } from "../../infra/inversify/inversify.config";
import { TYPES } from "../../infra/inversify/types";

const routes = Router();

const walletController = container.get<WalletController>(TYPES.WalletController);

routes.post('/wallets', dtoValidationMiddleware(AddWalletDTO), (req, res) => walletController.addWallet(req, res));
routes.get('/wallets', (req, res) => walletController.getAllWallets(req, res));
routes.get('/wallets/:id', (req, res) => walletController.getWalletById(req, res));
routes.put('/wallets/:id', dtoValidationMiddleware(UpdateWalletDTO), (req, res) => walletController.updateWallet(req, res));
routes.delete('/wallets/:id', (req, res) => walletController.deleteWallet(req, res));

export { routes };