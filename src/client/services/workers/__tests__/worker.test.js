import worker from '../index';

jest.mock('ethers', () => ({
  utils: {
    parseTransaction: jest.fn(tx => `parsed${tx}`),
  },
}));

describe('Worker', () => {
  test('Worker object method can process transactions', () => {
    const transactions = [
      '0FAD3DFA',
      '1FAD3DFA',
      '2FAD3DFA',
    ]
    const result = worker.parseTransactions(transactions);
    expect(result).toEqual([
      'parsed0FAD3DFA',
      'parsed1FAD3DFA',
      'parsed2FAD3DFA',
    ]);
  });
})
