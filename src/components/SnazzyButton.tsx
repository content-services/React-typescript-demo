import React from 'react';
import { createUseStyles } from 'react-jss';


const styles = {
  snazzyButton: {

    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',

  },
  normalButton: {

    backgroundColor: 'gray',
    color: 'black',
    padding: '10px 20px',
    borderRadius: '5px',

  },
};

const useStyles = createUseStyles(styles);

interface SnazzyButtonProps {
  isSnazzy: boolean;
}

const SnazzyButton: React.FC<SnazzyButtonProps> = ({ isSnazzy, ...rest }) => {
  const classes = useStyles();

  return (
    <button className={isSnazzy ? classes.snazzyButton : classes.normalButton} {...rest}>
      { }
    </button>
  );
};

export default SnazzyButton;
