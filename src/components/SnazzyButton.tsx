import React, { CSSProperties } from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { ColoredTd } from './ColoredTd';

type SnazzyButtonProps = {

  isSnazzy: boolean;

} & ButtonProps;

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ color, isSnazzy, ...rest }) => {
  if (isSnazzy) {
    return (

      <Button style={color as CSSProperties} {...rest} />

    );
  }

  return <Button style={color as CSSProperties} {...rest} />;
};

export default SnazzyButton;
