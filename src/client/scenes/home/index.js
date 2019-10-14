import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { Block, Col, Row } from 'styled-blocks';
import logo from '../../static/whale-logo.png';
import BlockContainer from '../../components/block-container';

const LinkBlock = ({ number, timestamp }) => (
  <BlockContainer.Section key={number}>
    <Link to={`/block/${number}`}>
      <Block
        _padding="spacing.4"
      >
        {number}
        {' '}
-
        {timestamp}
      </Block>
    </Link>
  </BlockContainer.Section>
);


function Home({ blocks }) {
  return (
    <Block
      _padding="spacing.2"
    >
      <Col>
        <Block
          as="img"
          _padding="spacing.3"
          _alignSelf="center"
          _borderRadius="10%"
          _maxHeight={['spacing.5', 'spacing.6', 'spacing.6']}
          src={logo}
          alt="whale logo (credit IFAW)"
        />
        <Row
          _flexWrap="wrap"
          _flexDirection="row-reverse"
          _alignItems="flex-start"
        >
          <BlockContainer width={['100%', '100%', 'spacing.6']}>
            <BlockContainer.Section
              _paddingLeft="spacing.4"
              _paddingRight="spacing.4"
            >
              <h2>Stats</h2>
            </BlockContainer.Section>
            <BlockContainer.Section
              _padding="spacing.4"
            >
              <p>Lorem ipsum dolor</p>
            </BlockContainer.Section>
          </BlockContainer>
          <BlockContainer width={['100%', '100%', 'spacing.7']}>
            {blocks.map(LinkBlock)}
          </BlockContainer>
        </Row>
      </Col>
    </Block>
  );
}

export default Home;
