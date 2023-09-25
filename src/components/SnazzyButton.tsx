import React from 'react';
import { createUseStyles } from 'react-jss';
import { snazzyButtonStyle } from './helpers';
import { Button } from '@patternfly/react-core';



const styles = {
  snazzyButton: snazzyButtonStyle


};

const useStyles = createUseStyles(styles);

interface SnazzyButtonProps {
  isSnazzy: boolean;
  children: React.ReactNode;
}

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ isSnazzy, children, ...rest }) => {
  const classes = useStyles();



  return (
    <button className={isSnazzy ? classes.snazzyButton : ' '} {...rest}>
      {children}
    </button>
  );
};

export default SnazzyButton;
