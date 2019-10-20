import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { utils } from 'ethers';
import { Block, Col, Row } from 'styled-blocks';
import { parseTransactions, getTransactionsViaService, getBlockViaService } from '../../services/ethereum';
import BlockContainer from '../../components/block-container';
import Skeleton from '../../components/transactions-skeleton';

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
    let active = true;
    if (!currentBlock) {
      getBlockViaService(Number(number)).then(block => {
        if (active) {
          setCurrentBlock(block);
        }
      });
    } else {
      getTransactionsViaService(currentBlock)
        .then(parseTransactions)
        .then(txs => {
          if (active) {
            setBlockTransactions(txs);
          }
        });
    }
    return () => { active = false; };
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
            <Link to="/">Back</Link>
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
              {blockTransactions && (
                <Row
                  _justifyContent="space-between"
                >
                  <Block _fontWeight="bold">Hash</Block>
                  <Block _fontWeight="bold">Eth Amount</Block>
                </Row>
              )}
              {blockTransactions ? blockTransactions
                .filter(({ data }) => data === '0x')
                .map(each => (
                  <Row
                    key={each.hash}
                    _justifyContent="space-between"
                  >
                    <Block
                      _textOverflow="ellipsis"
                      _overflow="hidden"
                    >
                      {each.hash}
                    </Block>
                    <Block
                      _fontWeight="bold"
                      _paddingLeft="spacing.2"
                    >
                      {utils.formatEther(each.value)}
                    </Block>
                  </Row>
                ))
                : (<Skeleton />)}
            </Block>
          </BlockContainer.Section>
        </BlockContainer>
      </Col>
    </Block>
  );
};

export default Details;
