export const getAverageTimePerBlock = blocks => {
  const [totalTimeInSeconds] = blocks.reduce((acc, next) => {
    const difference = acc[1] ? acc[1].timestamp - next.timestamp : 0;
    return [acc[0] + difference, next];
  }, [0, undefined]);

  return totalTimeInSeconds / blocks.length - 1;
};

export const getAverageTxPerBlock = blocks => {
  const totalTx = blocks.reduce((acc, each) => acc + each.transactions.length, 0);

  return totalTx / blocks.length;
};
