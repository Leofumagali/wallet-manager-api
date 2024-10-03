// import request from 'supertest';
// import { app } from '../../main';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose, { Types } from 'mongoose';

// let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();

//   await mongoose.connect(mongoUri);
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('WalletController', () => {
//   const mockWalletService = {
//     addWallet: jest.fn(),
//     getWalletById: jest.fn(),
//     getAllWallets: jest.fn(),
//     updateWallet: jest.fn(),
//     deleteWallet: jest.fn(),
//   };

//   afterEach(async () => {
//     await mongoose.connection.db.dropDatabase();
//   });

  // it('should add a wallet successfully', async () => {
  //   const walletData = {
  //     name: 'My Wallet',
  //     address: '0x1234567890abcdef',
  //     network: {
  //       name: 'Ethereum',
  //       rpcUrl: 'https://mainnet.infura.io/v3/123',
  //       currencySymbol: 'ETH',
  //       blockExplorer: 'https://etherscan.io',
  //     },
  //   };

  //   mockWalletService.addWallet.mockResolvedValue(walletData);

  //   const response = await request(app)
  //     .post('/api/v1/wallets')
  //     .send(walletData);
    
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual(expect.objectContaining({
  //     name: walletData.name,
  //     address: walletData.address,
  //     network: expect.objectContaining(walletData.network),
  //   }));
  //   expect(response.body).toHaveProperty('_id');
  //   expect(mockWalletService.addWallet).toHaveBeenCalledWith(walletData);
  // });

  // it('should retrieve a wallet by id', async () => {
  //   const generatedId = new Types.ObjectId();
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

  //   mockWalletService.getWalletById.mockResolvedValue(walletData);

  //   const response = await request(app)
  //     .get(`/wallets/${generatedId}`);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(walletData);
  //   expect(mockWalletService.getWalletById).toHaveBeenCalledWith(generatedId);
  // });
// });