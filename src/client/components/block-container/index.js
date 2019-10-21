import React from 'react';
import styled, { keyframes, css } from 'styled-components';
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
// Create the keyframes
const rotate = keyframes`
  from {
    transform: scale(0);
    background: #ff41b4;
    opacity: 0.7;
  }
  
  50% {
    transform: scale(1.1);
  }
  
  60% {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;
const BlockSection = styled(Block)`
  border-top: none;
  animation: ${({ animation }) => (animation === 'entering' ? css`${rotate} 1s ease-out` : 'none')};
  & + & {
    border-top: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors['near-white']}
  }
  ${({ hover }) => hover && css`
    :hover {
      background: ${({ theme }) => theme.colors['lightest-blue']};
    }
  `}
`;

BlockContainer.Section = BlockSection;

export default BlockContainer;
