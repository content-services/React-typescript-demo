import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { useQueryClient } from 'react-query';

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
}

const AddCustomerButton: React.FC<Props> = ({ setIsModalOpen }) => {
  const queryClient = useQueryClient();

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Button onClick={handleButtonClick} variant='secondary'>
      Add New Customer
    </Button>
  );
};

export default AddCustomerButton;
