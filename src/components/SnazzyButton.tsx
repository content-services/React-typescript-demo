import React from 'react';
import { createUseStyles } from 'react-jss';
import snazzyButtonStyling from './snazzyButtonStyling';
interface SnazzyButtonProps {
  isSnazzy: boolean;

}


const useStyles = createUseStyles(snazzyButtonStyling);

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ isSnazzy, ...rest }) => {

  const classes = useStyles();


  return (
    <button className={isSnazzy ? classes.snazzyButton : classes.normalButton} {...rest}>
      { }
    </button>
  );
};

export default SnazzyButton;
