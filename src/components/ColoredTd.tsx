import { Td, TdProps } from '@patternfly/react-table';
import { createUseStyles } from 'react-jss';
import { choosableColors, Customer, getCustomers } from 'src/api/CustomerApi';

type Color = string;

const useStyles = (color: Color) =>
  createUseStyles({
    withColor: {
      color,
    },
  });

export interface TdPropsWithColor extends Omit<TdProps, 'ref'> {
  color: Color;
}

export const ColoredTd = ({ color, ...rest }: TdPropsWithColor) => {
  const classes = useStyles(color)();
  return <Td className={classes.withColor} {...rest} />;
};
