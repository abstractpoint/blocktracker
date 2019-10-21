import React from 'react';
import { Block, Col, Row } from 'styled-blocks';
import { TransitionGroup } from 'react-transition-group';
import logo from '../../static/whale-logo.png';
import Stats from '../../components/stats';
import LinkBlock from '../../components/link-block';
import LinkBlockPlaceholder from '../../components/link-block-placeholder';
import BlockContainer from '../../components/block-container';

function Home({ blocks, blockStats }) {
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
          _height={['spacing.5', 'spacing.6', 'spacing.6']}
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
              _paddingLeft="spacing.4"
              _paddingRight="spacing.4"
            >
              <Stats blockStats={blockStats} />
            </BlockContainer.Section>
          </BlockContainer>
          <BlockContainer width={['100%', '100%', 'spacing.7']}>
            {blocks[0] && (
              <LinkBlockPlaceholder
                average={blockStats.blockAverageSeconds}
                lastBlock={blocks[0].number}
              />
            )}
            <TransitionGroup component={null}>
              {blocks.map(LinkBlock)}
            </TransitionGroup>
          </BlockContainer>
        </Row>
      </Col>
    </Block>
  );
}

export default Home;
