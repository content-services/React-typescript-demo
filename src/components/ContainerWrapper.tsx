import { Grid, GridProps } from '@patternfly/react-core';
import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppContext } from '../middleware';

const useStyles =
  createUseStyles({
    horizontalAlign: {
      margin: '0',
      padding: '0',
      minHeight: '100vh',
    },
    horizontalAlignWithDarkmode: {
      composes: '$horizontalAlign',
      background: '#333',
      color: 'white',
    },
    verticalAlign: {
      margin: '0px auto',
      padding: '40px 24px',
    },
    darkTable: {
      background: '#333',
      color: 'white',
    },
    darkModal: {
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
    },
  });


export interface GridPropsWithDarkmode extends GridProps {
  darkmode: boolean;
}

export default ({ children }: { children: ReactNode }) => {
  const { darkmode } = useAppContext();
  const classes = useStyles();

  return (
    <Grid className={darkmode ? classes.horizontalAlignWithDarkmode : classes.horizontalAlign}>
      <Grid className={classes.verticalAlign}>{children}</Grid>
    </Grid>
  );
};
