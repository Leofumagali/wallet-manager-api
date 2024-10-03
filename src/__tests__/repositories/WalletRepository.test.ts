import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import { WalletRepository } from '../../infra/repositories/WalletRepository';
import { Wallet } from '../../entities/Wallet';
import 'reflect-metadata';

let mongoServer: MongoMemoryServer;
let walletRepository: WalletRepository;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  walletRepository = new WalletRepository();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('WalletRepository', () => {
  let walletId: Types.ObjectId;

  it('should add a wallet successfully', async () => {
    const walletData: Wallet = {
      name: 'My Wallet',
      address: '0x1234567890abcdef',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
    };

    const savedWallet = await walletRepository.add(walletData);

    expect(savedWallet.name).toBe(walletData.name);
    expect(savedWallet.address).toBe(walletData.address);
    expect(savedWallet.network.name).toBe(walletData.network.name);
    expect(savedWallet._id).toBeDefined();

    walletId = savedWallet._id!;
  });

  it('should find a wallet by id', async () => {
    const foundWallet = await walletRepository.getById(walletId);

    expect(foundWallet).not.toBeNull();
    expect(foundWallet!.name).toBe('My Wallet');
    expect(foundWallet!.address).toBe('0x1234567890abcdef');
  });

  it('should update a wallet successfully', async () => {
    const updatedData: Wallet = {
      name: 'Updated Wallet',
      address: '0xabcdef1234567890',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
    };

    const updatedWallet = await walletRepository.update(walletId, updatedData);

    expect(updatedWallet).not.toBeNull();
    expect(updatedWallet!.name).toBe(updatedData.name);
    expect(updatedWallet!.address).toBe(updatedData.address);
  });

  it('should delete a wallet successfully', async () => {
    const isDeleted = await walletRepository.delete(walletId);

    expect(isDeleted).toBe(true);

    const foundWallet = await walletRepository.getById(walletId);
    expect(foundWallet).toBeNull();
  });

  it('should return all wallets', async () => {
    await walletRepository.add({
      name: 'Wallet 1',
      address: '0xabc1',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
    });

    await walletRepository.add({
      name: 'Wallet 2',
      address: '0xabc2',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
    });

    const wallets = await walletRepository.getAll();
    
    expect(wallets.length).toBeGreaterThanOrEqual(2);
    expect(wallets[0].name).toBeDefined();
    expect(wallets[1].name).toBeDefined();
  });
});
