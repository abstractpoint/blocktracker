import { ethers } from 'ethers';
import * as Comlink from 'comlink';

const DEFAULT_BLOCKS = 10;

export const initProvider = () => {
  if (window.web3 && window.web3.currentProvider) {
    return new ethers.providers.Web3Provider(window.web3.currentProvider);
  }
  return ethers.getDefaultProvider();
};

export const singleProvider = initProvider();

export const getLatestBlocksViaService = untilBlock => singleProvider
  .getBlockNumber().then(latestBlockHeight => {
    const numberOfBlocksToGet = untilBlock ? (latestBlockHeight - untilBlock) : DEFAULT_BLOCKS;
    const limitedNumberOfBlocksToGet = numberOfBlocksToGet <= DEFAULT_BLOCKS
      ? numberOfBlocksToGet
      : DEFAULT_BLOCKS;
    const blocksToGet = Array(limitedNumberOfBlocksToGet)
      .fill(true).map((value, i) => latestBlockHeight - i);

    const blockPromises = blocksToGet.map(blockHeight => singleProvider.getBlock(blockHeight));

    return Promise.all(blockPromises);
  });

export const getTransactionsViaService = block => Promise.all(
  block.transactions.map(each => singleProvider.getTransaction(each)),
).then(transactions => transactions.map(t => t.raw));

export const getBlockViaService = blockNumber => singleProvider.getBlock(blockNumber);

const worker = new Worker('../workers/index.js');
const obj = Comlink.wrap(worker);


export const { parseTransactions } = obj;
