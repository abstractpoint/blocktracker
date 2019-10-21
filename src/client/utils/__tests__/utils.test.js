import { getAverageTimePerBlock } from '../../utils';

describe('Utils', () => {
  test('getAverageTimePerBlock should return average time', () => {
    const blocks = [
      { timestamp: 9000 },
      { timestamp: 8000 },
      { timestamp: 7000 },
      { timestamp: 6000 },
      { timestamp: 5000 },
    ];
    const result = getAverageTimePerBlock(blocks);
    expect(result).toEqual(1000);
  });
});
