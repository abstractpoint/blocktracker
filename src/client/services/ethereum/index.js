import { ethers } from 'ethers';

const singleProvider = () => {
  if (window.web3 && window.web3.currentProvider) {
    return new ethers.providers.Web3Provider(window.web3.currentProvider);
  }
  return ethers.getDefaultProvider();
};

export default singleProvider();
