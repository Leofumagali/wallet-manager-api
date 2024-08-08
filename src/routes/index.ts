import { Router } from "express";
import { dtoValidationMiddleware } from "../middlewares/dtoValidationMiddleware";
import { AddWalletDTO } from "../dto/AddWalletDTO";
import { walletController } from "../controllers/walletController";

const routes = Router();

routes.post('/wallets', dtoValidationMiddleware(AddWalletDTO), walletController.addWallet);

export { routes };