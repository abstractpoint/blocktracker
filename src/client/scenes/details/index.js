import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { utils } from 'ethers';
import { Block, Col } from 'styled-blocks';
import { parseTransactions, getTransactionsViaService, getBlockViaService } from '../../services/ethereum';
import BlockContainer from '../../components/block-container';

const getBlock = blocks => number => blocks.find(el => el.number === number);

const Details = ({ blocks }) => {
  const { number } = useParams();
  const [currentBlock, setCurrentBlock] = useState(undefined);
  const [blockTransactions, setBlockTransactions] = useState(undefined);

  useEffect(() => {
    const getBlockByNumber = getBlock(blocks);
    const block = getBlockByNumber(Number(number));

    setCurrentBlock(block);
  }, []);

  useEffect(() => {
    if (!currentBlock) {
      getBlockViaService(Number(number)).then(block => {
        setCurrentBlock(block);
      });
    } else {
      getTransactionsViaService(currentBlock)
        .then(parseTransactions)
        .then(setBlockTransactions);
    }
  }, [currentBlock]);

  return (
    <Block
      _padding="spacing.2"
    >
      <Col>
        <BlockContainer>
          <BlockContainer.Section
            _padding="spacing.4"
          >
            <Link to="/">Home</Link>
          </BlockContainer.Section>
          <BlockContainer.Section
            _paddingLeft="spacing.4"
            _paddingRight="spacing.4"
          >
            <h1>
              <span>Block </span>
              {number}
            </h1>
          </BlockContainer.Section>
          <BlockContainer.Section
            _padding="spacing.4"
          >
            <h2>Transactions</h2>
            <Block
              _overflow="auto"
            >
              {blockTransactions && blockTransactions
                .filter(({ data }) => data === '0x')
                .map(each => (
                  <div key={each.hash}>
                    {each.hash}
                    {' '}
              -
                    {' '}
                    {utils.formatEther(each.value)}
                  </div>
                ))}
            </Block>
          </BlockContainer.Section>
        </BlockContainer>
      </Col>
    </Block>
  );
};

export default Details;
