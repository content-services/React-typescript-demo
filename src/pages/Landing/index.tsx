/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  GridItem,
  Modal,
  ModalVariant,
  Select,
  SelectDirection,
  SelectOption,
  SelectVariant,
  Text,
  TextInput,
} from "@patternfly/react-core";
import { Caption, TableComposable, Tbody, Th, Thead, Tr } from "@patternfly/react-table";
import { FormEvent, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { choosableColors, Customer, getCustomers } from "src/api/CustomerApi";
import { ColoredTd } from "src/components/ColoredTd";
import Loader from "src/components/Loader";
import { useAppContext } from "src/context";

const inlineTextField = css`
  display:block;
`;

export default () => {
  const { setDarkmode, darkmode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<Customer>>({ isCool: false });
  const [selectToggle, setSelectToggle] = useState(false);
  const queryClient = useQueryClient();

  // Queries
  const { isLoading, data } = useQuery(
    "customers",
    getCustomers,
    // TODO: Stretch - Use the options object to handle errors.
  );

  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    setNewUser({ isCool: false });
    setIsModalOpen(false);
  };

  const columnHeaders = ["Name", "Age", "Is Cool"];

  if (isLoading) return <Loader />;
  return (
    <Grid>
      <GridItem sm={6}>
        <Button onClick={() => setDarkmode(!darkmode)} variant="secondary">
          {darkmode ? "LightMode" : "DarkMode"}
        </Button>
      </GridItem>
      <GridItem sm={6}>
        <Button onClick={() => setIsModalOpen(true)} variant="secondary">
          Add New Customer
        </Button>
      </GridItem>
      <Modal
        variant={ModalVariant.small}
        title="Add Customer" isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Form
          onSubmit={onSubmit}
        >
          <Grid css={inlineTextField}>
            <Text>Name</Text>
            <TextInput onChange={(value => setNewUser({ ...newUser, name: value }))} value={newUser.name || ""} id="name" type="text" />
          </Grid>
          <Grid css={inlineTextField}>
            <Text>Age</Text>
            <TextInput onChange={(value => setNewUser({ ...newUser, age: Number(value) }))} value={newUser.age || ""} id="age" type="number" />
          </Grid>
          <Grid css={inlineTextField}>
            <Text>Color</Text>
            <Select
              onToggle={() => setSelectToggle(!selectToggle)}
              isOpen={selectToggle}
              onSelect={(_e, value) => {
                if (typeof value === "string") //TODO: Fix this when creating the new Color type
                  setNewUser({ ...newUser, color: value });
                setSelectToggle(false);
              }
              }
              id="color"
              variant={SelectVariant.single}
              placeholderText="Select a color"
              selections={newUser?.color}
              direction={SelectDirection.up}
            >
              {
                choosableColors.map((color: string, index) =>
                  <SelectOption css={css`color: ${color}`} key={index} value={color} />
                )}
            </Select>
          </Grid>
          <Checkbox label="Is this person cool?" id="isCool" onChange={(value => setNewUser({ ...newUser, isCool: value }))} isChecked={newUser.isCool} />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
      <Grid>
        <TableComposable
          aria-label="Simple table"
          variant="compact"
        >
          <Caption>Here is a list of your customers:</Caption>
          <Thead>
            <Tr>
              {columnHeaders.map(columnHeader =>
                <Th key={columnHeader}>{columnHeader}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(({ name, age, color, isCool }) => (
              <Tr key={name}>
                <ColoredTd color={color} dataLabel="name">{name}</ColoredTd>
                <ColoredTd color={color} dataLabel="age">{age}</ColoredTd>
                <ColoredTd color={color} dataLabel="isCool">{isCool ? "Yup" : "Totally Not!"}</ColoredTd>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </Grid>
    </Grid >
  );
};
