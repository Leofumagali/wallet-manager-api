import request from 'supertest';
import { Types } from 'mongoose';
import { app } from '../../main';

describe('WalletController', () => {
  const mockWalletService = {
    addWallet: jest.fn(),
    getWalletById: jest.fn(),
    getAllWallets: jest.fn(),
    updateWallet: jest.fn(),
    deleteWallet: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a wallet successfully', async () => {
    const walletData = {
      name: 'My Wallet',
      address: '0x1234567890abcdef',
      network: {
        name: 'Ethereum',
        rpcUrl: 'https://mainnet.infura.io/v3/123',
        currencySymbol: 'ETH',
        blockExplorer: 'https://etherscan.io',
      },
    };

    mockWalletService.addWallet.mockResolvedValue({
      ...walletData,
      _id: new Types.ObjectId(),
    });

    const response = await request(app)
      .post('/api/v1/wallets')
      .send(walletData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(walletData));
    expect(response.body).toHaveProperty('_id');
    expect(mockWalletService.addWallet).toHaveBeenCalledWith(walletData);
  });

  // it('should retrieve a wallet by id', async () => {
  //   const generatedId = new Types.ObjectId();  // Gera um ObjectId válido
  //   const walletData = {
  //     _id: generatedId,
  //     name: 'My Wallet',
  //     address: '0x1234567890abcdef',
  //     network: {
  //       name: 'Ethereum',
  //       rpcUrl: 'https://mainnet.infura.io/v3/123',
  //       currencySymbol: 'ETH',
  //       blockExplorer: 'https://etherscan.io',
  //     },
  //   };

  //   // Simula o retorno do método getWalletById
  //   mockWalletService.getWalletById.mockResolvedValue(walletData);

  //   const response = await request(app)
  //     .get(`/wallets/${generatedId}`);  // Endpoint para buscar wallet por ID

  //   expect(response.status).toBe(200);  // Verifica se a resposta é 200 OK
  //   expect(response.body).toEqual(walletData);  // Verifica se o corpo da resposta contém os dados da wallet
  //   expect(mockWalletService.getWalletById).toHaveBeenCalledWith(generatedId.toString());  // Verifica se o serviço foi chamado corretamente
  // });
});