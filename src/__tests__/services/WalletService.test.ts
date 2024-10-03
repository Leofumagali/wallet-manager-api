import { Types } from "mongoose";
import { WalletService } from "../../domain/services/WalletService";
import { Wallet } from "../../entities/Wallet";
import { WalletRepository } from "../../infra/repositories/WalletRepository";

describe('WalletService', () => {
  let walletService: WalletService;
  let walletRepository: WalletRepository;

  const mockWalletRepository = {
    add: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    walletRepository = mockWalletRepository as unknown as WalletRepository;
    walletService = new WalletService(walletRepository);
  });
  
  it('should add a wallet successfully', async () => {
    const walletData: Wallet = {
      name: 'My Wallet',
      address: '0x1234567890abcdef',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      }
    };

    mockWalletRepository.add.mockResolvedValue(walletData);

    const result = await walletService.addWallet(walletData);

    expect(result).toBe(walletData);
    expect(mockWalletRepository.add).toHaveBeenCalledWith(walletData);
  });

  it('should retrieve a wallet by id', async () => {
    const walletData: Wallet = {
      name: 'My Wallet',
      address: '0x1234567890abcdef',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
      _id: new Types.ObjectId(),
    };

    mockWalletRepository.getById.mockResolvedValue(walletData);

    const result = await walletService.getWalletById(walletData._id!);

    expect(result).toBe(walletData);
    expect(mockWalletRepository.getById).toHaveBeenCalledWith(walletData._id!);
  });

  it('should update a wallet successfully', async () => {
    const walletData: Wallet = {
      name: 'Updated Wallet',
      address: '0xabcdef1234567890',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
      _id: new Types.ObjectId(),
    };

    mockWalletRepository.update.mockResolvedValue(walletData);

    const result = await walletService.updateWallet(walletData._id!, walletData);

    expect(result).toBe(walletData);
    expect(mockWalletRepository.update).toHaveBeenCalledWith(walletData._id!, walletData);
  });

  it('should delete a wallet successfully', async () => {
    const walletId = new Types.ObjectId();

    mockWalletRepository.delete.mockResolvedValue(true);
    
    const result = await walletService.deleteWallet(walletId);

    expect(result).toBe(true);
    expect(mockWalletRepository.delete).toHaveBeenCalledWith(walletId);
  });

});