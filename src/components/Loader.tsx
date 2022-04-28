/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Spinner } from "@patternfly/react-core";
import { ReactElement } from "react";

export default ({
  children,
  isLoading = true,
}: {
  children?: ReactElement;
  isLoading?: boolean;
}) =>
  isLoading ? (
    <Grid
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <Spinner />{" "}
    </Grid>
  ) : (
    <>{children}</>
  );
