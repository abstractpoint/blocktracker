import {
  singleProvider,
  initProvider,
  getLatestBlocksViaService,
  getTransactionsViaService,
  getBlockViaService ,
} from '../index';

jest.mock('ethers', () => ({
  ethers: {
    getDefaultProvider: jest.fn(() => ({
      getBlockNumber: jest.fn(() => Promise.resolve(104)),
      getBlock: jest.fn(() => Promise.resolve({ number: 123})),
      getTransaction: jest.fn(() => Promise.resolve({ raw: '000000000000' })),
    })),
    providers: {
      Web3Provider: jest.fn(),
    },
  },
  utils: {
    parseTransaction: jest.fn(tx => tx),
  },
}));

describe('Ethereum Service', () => {
  test('Offers a single provider', () => {
    expect(singleProvider).not.toBe(undefined);
  });

  test('Sets up a metamask supplied provider', () => {
    window.web3 = { currentProvider: {}};
    expect(initProvider()).toEqual(expect.any(Object));
  });

  describe('getLatestBlocksViaService', () => {
    test('getLatestBlocksViaService returns blocks', async () => {
      const result = await getLatestBlocksViaService(100);
      expect(result.length).toBe(4);
      expect(result).toEqual(expect.any(Array));
    });

    test('getLatestBlocksViaService limits blocks at 10', async () => {
      const result = await getLatestBlocksViaService(5);
      expect(result.length).toBe(10);
    });

    test('getLatestBlocksViaService gets default number when false', async () => {
      const result = await getLatestBlocksViaService(false);
      expect(result.length).toBe(10);
    });
  });

  describe('getTransactionsViaService', () => {
    test('getTransactionsViaService returns transactions', async () => {
      const blockWithTransactions = {
        transactions: [
          '0FAD3DFA',
          '1FAD3DFA',
          '2FAD3DFA',
        ],
      };
      const result = await getTransactionsViaService(blockWithTransactions);
      expect(result).toEqual([
        '000000000000',
        '000000000000',
        '000000000000',
      ]);
    });
  });
  describe('getBlockViaService', () => {
    test('getBlockViaService returns a block', async () => {
      const result = await getBlockViaService(123);
      expect(result).toEqual({ number: 123 });
    });
  });
});
