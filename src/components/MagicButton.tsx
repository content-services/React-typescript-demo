import styled from "@emotion/styled";
import { Button, ButtonProps } from "@patternfly/react-core";

import { magicColorLiteral } from "./helpers";

export interface MagicButtonProps extends ButtonProps {
  isMagical?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MagicButton = styled(({ isMagical, ...rest }: MagicButtonProps) => <Button {...rest} />)`
${(props) => props.isMagical ? magicColorLiteral : ""}
`;
