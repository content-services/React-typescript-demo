import { Grid, Spinner } from '@patternfly/react-core';
import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({
  children,
  isLoading = true,
}: {
  children?: ReactElement;
  isLoading?: boolean;
}) => {
  const classes = useStyles();

  return isLoading ? (
    <Grid className={classes.center}>
      <Spinner />
    </Grid>
  ) : (
    <>{children}</>
  );
};
