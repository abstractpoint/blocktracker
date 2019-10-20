import { ethers } from 'ethers';
import * as Comlink from 'comlink';

const initProvider = () => {
  if (window.web3 && window.web3.currentProvider) {
    return new ethers.providers.Web3Provider(window.web3.currentProvider);
  }
  return ethers.getDefaultProvider();
};

export const singleProvider = initProvider();

export const pullLatestBlocks = untilBlock => singleProvider
  .getBlockNumber().then(latestBlockHeight => {
    const numberOfBlocksToGet = untilBlock ? (latestBlockHeight - untilBlock) : 10;

    const blocksToGet = Array(numberOfBlocksToGet)
      .fill(true).map((value, i) => latestBlockHeight - i);

    const blockPromises = blocksToGet.map(blockHeight => singleProvider.getBlock(blockHeight));

    return Promise.all(blockPromises);
  });

const worker = new Worker('../workers/index.js');
const obj = Comlink.wrap(worker);


export const { parseTransactions } = obj;
