import React from 'react';
import { Block, Row } from 'styled-blocks';
import styled, { keyframes } from 'styled-components';
import BlockContainer from '../block-container';

const animation = keyframes`
  from {
    opacity: 1;
  }
  
  50% {
    opacity: 0.5;
  }
  
  to {
    opacity: 1;
  }
`;

const animationProgress = keyframes`
  from {
    width: 0%;
  }
  
  to {
    width: 100%;
  }
`;

const ProgressBlock = styled('div')`
  animation: ${animation} 2s linear infinite, ${animationProgress} ${({ time }) => time}s ease-out;
`;

const LinkBlockPlaceholder = ({ average, lastBlock }) => (
  <BlockContainer.Section key={`unique${lastBlock}`}>
    <Row
      _justifyContent="space-between"
    >
      <Block
        time={average}
        as={ProgressBlock}
        _backgroundColor="colors.dark-pink"
        _borderTopLeftRadius="0.25rem"
        _borderTopRightRadius="0.25rem"
        _width="100%"
        _height="3px"
      />
    </Row>
  </BlockContainer.Section>
);

export default LinkBlockPlaceholder;
