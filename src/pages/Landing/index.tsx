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
import { useMutation, useQueryClient } from "react-query";
import { choosableColors, Color, Customer, Customers, postNewCustomer } from "src/api/Customer/CustomerApi";
import { getCustomerQuery } from "src/api/Customer/CustomerQueries";
import { ColoredTd } from "src/components/ColoredTd";
import Loader from "src/components/Loader";
import { MagicButton } from "src/components/MagicButton";
import { useAppContext } from "src/context";

const inlineTextField = css`
  display:block;
`;

export default () => {
  const { setDarkmode, darkmode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<Customer>>({ isCool: false });
  const isValidUser = newUser.age && newUser.isCool !== undefined && newUser.name && newUser.color;
  const [selectToggle, setSelectToggle] = useState(false);
  const queryClient = useQueryClient();

  // Queries
  const { isLoading, data } = getCustomerQuery();

  const { mutate, isLoading: isUpdating } = useMutation(postNewCustomer, {
    onMutate: async (newCustomer) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("customers");

      // Snapshot the previous value
      const previousData: Customers = queryClient.getQueryData("customers") || [];

      // Optimistically update to the new value
      queryClient.setQueryData<Customers>("customers", (old: Customers = []) =>
        [...old, newCustomer]);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("customers");
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newCustomer, context) => {
      if (context) {
        const { previousData } = context as { previousData: Customers };
        queryClient.setQueryData("customers", previousData);
      }
    },
  });


  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    mutate(newUser as Customer);
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
        <Button isDisabled={isUpdating} isLoading={isUpdating} onClick={() => setIsModalOpen(true)} variant="secondary">
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
                const color = value as Color;
                setNewUser({ ...newUser, color });
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
          <MagicButton isMagical type="submit" isDisabled={!isValidUser}>Submit</MagicButton>
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
            {data?.map(({ name, age, color, isCool }, index) => (
              <Tr key={name + index}>
                <ColoredTd color={color} dataLabel="name">{name}</ColoredTd>
                <ColoredTd color={color} dataLabel="age">{age}</ColoredTd>
                <ColoredTd color={color} dataLabel="isCool">{isCool ? "Yup" : "Totally Not!"}</ColoredTd>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </Grid >
    </Grid >
  );
};
