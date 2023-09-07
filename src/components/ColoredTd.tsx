import React from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

type Color = string;

const useStyles = (color: Color) =>
  createUseStyles({
    snazzyButton: {
      color,
      backgroundColor: 'lightgray',
      borderRadius: '5px',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'gray',
      },
    },
  });

export interface SnazzyButtonProps extends Omit<ButtonProps, 'ref'> {
  color: Color;
}

export const SnazzyButton = ({ color, ...rest }: SnazzyButtonProps) => {
  const classes = useStyles(color)();

  return <Button className={classes.snazzyButton} {...rest} />;
};

