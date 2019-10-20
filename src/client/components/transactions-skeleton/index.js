import React from 'react';
import { Block, Row, Col } from 'styled-blocks';

const randomisePercent = () => Math.floor(Math.random() * 20 + 60);

const SkeletonRow = (props, i) => (
  <Row
    key={i}
    _alignItems="stretch"
    _alignContent="stretch"
    _justifyContent="space-between"
  >
    <Block
      _backgroundColor="colors.light-gray"
      _height="fontSizes.1"
      _width={`${randomisePercent()}%`}
      _margin="spacing.2"
    />
    <Block
      _backgroundColor="colors.light-gray"
      _height="fontSizes.1"
      _width="10%"
      _margin="spacing.2"
    />
  </Row>
);

const Skeleton = () => (
  <Col>
    {Array(10).fill(true).map(SkeletonRow)}
  </Col>
);

export default Skeleton;
