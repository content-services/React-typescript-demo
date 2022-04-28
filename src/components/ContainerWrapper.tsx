import styled from "@emotion/styled";
import { Grid, GridProps } from "@patternfly/react-core";
import { ReactNode } from "react";

import { useAppContext } from "../context";

export interface GridPropsWithDarkmode extends GridProps {
  darkmode: boolean;
}

// Will fix this sometime...
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HorizontalAlign = styled(({ darkmode, ...rest }) => <Grid {...rest} />)`
  background: white;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  ${(props: GridPropsWithDarkmode) =>
    props?.darkmode
      ? ` 
  background: #333;
  color:white;
  `
      : ""}
`;

const VerticalAlign = styled(Grid)`
  margin: 0px auto;
  padding: 40px 24px;
`;

export default ({ children }: { children: ReactNode }) => {
  const { darkmode } = useAppContext();
  return (
    <HorizontalAlign darkmode={darkmode}>
      <VerticalAlign>{children}</VerticalAlign>
    </HorizontalAlign>
  );
};
