import React from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

interface SnazzyButtonProps extends ButtonProps {
  isSnazzy?: boolean;
}
const useStyles = createUseStyles({
  snazzyButton: {
    backgroundColor: 'black',
    color: 'white',
  },
});

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ isSnazzy, ...rest }) => {
  const classes = useStyles();
  const classNames = isSnazzy ? `${classes.snazzyButton} ${rest.className || ''}` : rest.className;

  return <Button {...rest} className={classNames} />;
};

export default SnazzyButton;
