import React from 'react';
import styled from 'styled-components';
import { Block } from 'styled-blocks';

const BlockWithShadow = styled(Block)`
  position: relative;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const BlockContainer = ({ children, width = 'unset' }) => (
  <BlockWithShadow
    _background="colors.white"
    _margin="spacing.2"
    _borderRadius="0.25rem"
    _flexGrow="1"
    _width={width}
  >
    {children}
  </BlockWithShadow>
);

const BlockSection = styled(Block)`
  border-top: none;
  & + & {
    border-top: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors['near-white']}
  }
`;

BlockContainer.Section = BlockSection;

export default BlockContainer;
