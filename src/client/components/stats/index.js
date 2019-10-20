import React from 'react';
import { Block } from 'styled-blocks';

const Stats = ({ blockStats }) => {
  const { blockAverageSeconds, blockAverageTxNo } = blockStats;
  return ((blockAverageSeconds && blockAverageTxNo) ? (
    <Block>
      <p>Average Block: {Math.floor(blockAverageSeconds)}s</p>
      <p>Average Tx per block: {Math.floor(blockAverageTxNo)}</p>
    </Block>
  ) : null);
};

export default Stats;
