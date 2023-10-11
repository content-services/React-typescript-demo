import React, { useState, FormEvent } from 'react';
import { useQueryClient } from 'react-query';
import { Customer, addNewCustomer } from 'src/api/CustomerApi';

interface AddCustomerModalProps {
  onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ onClose }) => {
  const [newUser, setNewUser] = useState<Partial<Customer>>({ isCool: false });
  const queryClient = useQueryClient();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNewCustomer(newUser as Customer);
      setNewUser({ isCool: false });
      onClose();
      queryClient.invalidateQueries('customers');
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Customer</h2>
        <form onSubmit={onSubmit}>
          <label>
            Is Cool:
            <input
              type="checkbox"
              name="isCool"
              checked={newUser.isCool}
              onChange={() => setNewUser((prevUser) => ({ ...prevUser, isCool: !prevUser.isCool }))}
            />
          </label>
          <button type="submit">Add Customer</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddCustomerModal;
