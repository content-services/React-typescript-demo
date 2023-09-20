import React from 'react';
import { createUseStyles } from 'react-jss';
import { snazzyButtonStyle } from './helpers';


interface ButtonProps {
  children: React.ReactNode;
}

const styles = {
  snazzyButton: {

  }
};

const useStyles = createUseStyles(styles);

interface SnazzyButtonProps {
  isSnazzy: boolean;
}

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ isSnazzy, children, ...rest }) => {
  const classes = useStyles();

  const classNames = {
    [classes.snazzyButton]: isSnazzy,

  };

  const className = Object.keys(classNames)
    .filter((key) => classNames[key])
    .join(' ');

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default SnazzyButton;
