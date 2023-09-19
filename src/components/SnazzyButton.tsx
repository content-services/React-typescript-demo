import React from 'react';
import { createUseStyles } from 'react-jss';
import { snazzyButtonStyle } from './helpers';
interface ButtonProps {
  children: React.ReactNode;
}

const styles = {
  snazzyButton: {

    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',

  },

};

const useStyles = createUseStyles(styles);

interface SnazzyButtonProps {
  isSnazzy: boolean;
}

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <button className="isSnazzy ? classes.snazzyButton :" {...rest}>
      {children}
    </button>
  );
};

export default SnazzyButton;
