import React from 'react';
import { createUseStyles } from 'react-jss';
import { snazzyButtonStyle } from './helpers';
import isSnazzy from 'src/components/SnazzyButton';
interface ButtonProps {
  children: React.ReactNode;
}

const styles = {
  snazzyButton: {
    border: '1px solid currentColor',
    borderRadius: '5px',
    color: '#0066CC!important',
    backgroundColor: 'transparent!important',
    overflow: 'hidden',
    position: 'relative',
    textDecoration: 'none',
    transition: 'all .2s ease-in-out',
    willChange: 'transform',
    zIndex: '0',
    '&:after': {
      background: 'linear-gradient(90deg,#19547b, #ffd89b, #19547b)',
      content: '',
      display: 'block',
      height: '100%',
      width: '100%',
      position: 'absolute',
      left: '0',
      top: '0',
      transform: 'translate(-100%, 0) rotate(10deg)',
      transformOrigin: 'top left',
      transition: '.2s transform ease-out',
      willChange: 'transform',
      zIndex: '-1',
    },
    '&:hover:after': {
      transform: 'translate(0, 0)',
    },
    '&:hover': {
      fontWeight: '600',
      border: '1px solid transparent',
      color: 'white!important',
      transform: 'scale(1.05)',
      willChange: 'transform',

    },
  }
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
