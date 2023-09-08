import React, { CSSProperties } from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { ColoredTd } from './ColoredTd';

type SnazzyButtonProps = {
  color: string;
  isSnazzy: boolean;
  customStyle?: string;
} & ButtonProps;

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ color, isSnazzy, customStyle, ...rest }) => {
  if (isSnazzy) {
    return (
      <ColoredTd color={color}>
        <Button style={customStyle as CSSProperties} {...rest} />
      </ColoredTd>
    );
  }

  return <Button style={customStyle as CSSProperties} {...rest} />;
};

export default SnazzyButton;
