import styled from "@emotion/styled";
import { Td, TdProps } from "@patternfly/react-table";
import { Color } from "src/api/Customer/CustomerApi";

export interface TdPropsWithColor extends TdProps {
  color: Color;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ColoredTd = styled(({ color: _, ...rest }) => <Td {...rest} />)`
  color: ${(props: TdPropsWithColor) => props?.color}!important;
`;