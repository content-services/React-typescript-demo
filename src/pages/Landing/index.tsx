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
} from '@patternfly/react-core';
import { ActionsColumn, Caption, TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { FormEvent, Key, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useQuery, useQueryClient } from 'react-query';
import { addNewCustomer, choosableColors, Customer, customersGetter, customersSetter, getCustomers, deleteCustomer } from 'src/api/CustomerApi';
import { ColoredTd } from 'src/components/ColoredTd';
import Loader from 'src/components/Loader';
import SnazzyButton from 'src/components/SnazzyButton';
import { useAppContext } from 'src/middleware';


const useStyles = createUseStyles({
  inlineText: {
    display: 'block',
  },
});

export default () => {
  const classes = useStyles();
  const { setDarkmode, darkmode } = useAppContext();
  const [isDarkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<Customer>>({ isCool: false });
  const [selectToggle, setSelectToggle] = useState(false);
  const queryClient = useQueryClient();

  // Queries
  const { isLoading, data } = useQuery(
    'customers',
    getCustomers,
    // TODO: Stretch - Use the options object to handle errors.
  );

  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    addNewCustomer(newUser as Customer)
    setNewUser({ isCool: false });
    setIsModalOpen(false);
    queryClient.invalidateQueries('customers');
  };

  const columnHeaders = ['Name', 'Age', 'Is Cool'];

  if (isLoading) return <Loader />;
  function handleDelete(customerId: any): void {

    try {
      deleteCustomer(customerId);
      queryClient.invalidateQueries('customers');
    } catch (error) {
      console.error('An error occurred while deleting the customer:', error);

    }
  }
  function generateActionItems(name) {
    return [
      { title: 'Delete', onClick: () => handleDelete(name) },
    ];
  }

  return (
    <Grid>
      <GridItem sm={6}>
        <Button onClick={() => setDarkmode(!darkmode)} variant='secondary'>
          {darkmode ? 'LightMode' : 'DarkMode'}
        </Button>
      </GridItem>
      <GridItem sm={6}>
        <Button onClick={() => setIsModalOpen(true)} variant='secondary'>
          Add New Customer
        </Button>
      </GridItem>
      <Modal
        variant={ModalVariant.small}
        title='Add Customer'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={isDarkMode ? 'dark-mode-modal' : ''}
      >
        <Form onSubmit={onSubmit}>
          <Grid className={classes.inlineText}>
            <Text>Name</Text>
            <TextInput
              onChange={(value) => setNewUser({ ...newUser, name: value })}
              value={newUser.name || ''}
              id='name'
              type='text'
            />
          </Grid>
          <Grid className={classes.inlineText}>
            <Text>Age</Text>
            <TextInput
              onChange={(value) => setNewUser({ ...newUser, age: Number(value) })}
              value={newUser.age || ''}
              id='age'
              type='number'
            />
          </Grid>
          <Grid className={classes.inlineText}>
            <Text>Color</Text>
            <Select
              onToggle={() => setSelectToggle(!selectToggle)}
              isOpen={selectToggle}
              onSelect={(_e, value) => {
                if (typeof value === 'string')
                  setNewUser({ ...newUser, color: value });
                setSelectToggle(false);
              }}
              id='color'
              variant={SelectVariant.single}
              placeholderText='Select a color'
              selections={newUser?.color}
              direction={SelectDirection.up}
            >
              {choosableColors.map((color: string, index) => (
                <SelectOption style={{ color }} key={index} value={color} />
              ))}
            </Select>
          </Grid>
          <Checkbox
            label='Is this person cool?'
            id='isCool'
            onChange={(value) => setNewUser({ ...newUser, isCool: value })}
            isChecked={newUser.isCool}
          />
          <SnazzyButton isSnazzy>
            Submit
          </SnazzyButton>
        </Form>
      </Modal>
      <Grid>
        <TableComposable aria-label='Simple table' variant='compact' className={`table-composable ${isDarkMode ? 'dark-mode-table' : ''}`}>
          <Caption>Here is a list of your customers:</Caption>
          <Thead>
            <Tr>
              {columnHeaders.map((columnHeader) => (
                <Th key={columnHeader}>{columnHeader}</Th>
              ))}
              <Th key="kebab-menu"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(({ name, age, color, isCool }, key: number) => (
              <Tr key={name + key}>
                <ColoredTd color={color} dataLabel='name'>
                  {name}
                </ColoredTd>
                <ColoredTd color={color} dataLabel='age'>
                  {age}
                </ColoredTd>
                <ColoredTd color={color} dataLabel='isCool'>
                  {isCool ? 'Yup' : 'Totally Not!'}
                </ColoredTd>
                <Td key={`kebab-menu-${key}`}>
                  <ActionsColumn items={generateActionItems(name)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </Grid>
    </Grid>
  );
};




