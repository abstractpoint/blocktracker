import * as Comlink from 'comlink';
import { utils } from 'ethers';

const obj = {
  parseTransactions: transactions => transactions.map(each => utils.parseTransaction(each)),
};

Comlink.expose(obj);
