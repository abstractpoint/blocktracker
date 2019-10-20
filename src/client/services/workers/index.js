import * as Comlink from 'comlink';
import { utils } from 'ethers';

const worker = {
  parseTransactions: transactions => transactions.map(each => utils.parseTransaction(each)),
};

Comlink.expose(worker);

export default worker;
