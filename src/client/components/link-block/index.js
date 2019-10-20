import React from 'react';
import { Block, Row } from 'styled-blocks';
import {
  Link,
} from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { timeAgo } from '../../utils';
import BlockContainer from '../block-container';

const LinkBlock = ({ number, timestamp }) => (
  <Transition key={number} timeout={1000}>
    {(state) => (
      <BlockContainer.Section
        _background={state === 'entering' ? 'yellow' : 'white'}
      >
        <Link to={`/block/${number}`}>
          <Row
            _padding="spacing.4"
            _justifyContent="space-between"
          >
            <Block>
              {number}
            </Block>
            <Block>
              {timeAgo(timestamp * 1000)}
            </Block>
          </Row>
        </Link>
      </BlockContainer.Section>
    )}
  </Transition>
);

export default LinkBlock;
