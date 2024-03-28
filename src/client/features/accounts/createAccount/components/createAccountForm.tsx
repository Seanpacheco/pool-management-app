import * as React from 'react';
import { TextInput, Button, Group, Box, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IMaskInput } from 'react-imask';
import { notifications } from '@mantine/notifications';
import { useCreateAccount } from '../api/createAccount';

export const CreateAccountForm = () => {
  const createAccountMutation = useCreateAccount();
  const form = useForm({
    initialValues: {
      accountName: '',
      email: '',
      phone: '',
    },

    validate: {
      accountName: (value) => (value.length < 2 ? 'Account name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value.length < 17 ? 'Phone number must have at least 11 digits' : null),
    },
  });
  const handleError = (errors: typeof form.errors) => {
    if (errors.accountName) {
      notifications.show({ message: 'Please fill account name field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    }
  };

  return (
    <Box maw={340} mx="auto">
      <form
        // method="POST"
        onSubmit={form.onSubmit((values) => console.log(values), handleError)}
      >
        <TextInput
          withAsterisk
          label="Account Name"
          placeholder="account name"
          {...form.getInputProps('accountName')}
        />
        <TextInput withAsterisk label="Email" placeholder="account@email.com" {...form.getInputProps('email')} />
        <Input.Wrapper withAsterisk label="Phone Number" {...form.getInputProps('phone')}>
          <Input
            component={IMaskInput}
            mask="+1 (000) 000-0000"
            placeholder="phone number"
            {...form.getInputProps('phone')}
          />
        </Input.Wrapper>
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            onClick={async () => {
              await createAccountMutation.mutateAsync({
                data: {
                  account_name: form.values.accountName,
                  phone: form.values.phone,
                  email: form.values.email,
                },
              });
            }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};
