import styled from "@emotion/styled";
import { Td, TdProps } from "@patternfly/react-table";

export interface TdPropsWithColor extends TdProps {
  color: string; //TODO: Use the new Color type to fix this.
}

export const ColoredTd = styled(({ color, ...rest }) => <Td {...rest} />)`
  color: ${(props: TdPropsWithColor) => props?.color}!important;
`;