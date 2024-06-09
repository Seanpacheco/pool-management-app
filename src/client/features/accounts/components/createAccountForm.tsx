import * as React from 'react';
import { TextInput, Button, Group, Box, Input, Text, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IMaskInput } from 'react-imask';
import { notifications } from '@mantine/notifications';
import { useCreateAccount } from '../api/createAccount';
import { useAuth0 } from '@auth0/auth0-react';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';

export const CreateAccountForm = () => {
  const auth = useAuth0();
  const createAccountMutation = useCreateAccount({}, auth); // Pass the required arguments to the useCreateAccount function

  const schema = z.object({
    accountName: z.string().min(2, { message: 'Account name must have at least 2 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    phone: z.string().min(17, { message: 'Phone number must have at least 11 digits' }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      accountName: '',
      email: '',
      phone: '',
    },

    validate: zodResolver(schema),
  });
  const handleError = (errors: typeof form.errors) => {
    if (errors.accountName) {
      notifications.show({ message: 'Please fill account name field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    }
  };
  if (createAccountMutation.isPending) {
    return <PageLoadSpinner />;
  }
  if (createAccountMutation.isSuccess)
    return (
      <Center>
        <Text size="lg">Account Created Successfully</Text>
      </Center>
    );
  return (
    <Box maw={340} mx="auto">
      <form
        // method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (form.validate().hasErrors === true) {
            handleError(form.errors);
          } else {
            createAccountMutation.mutateAsync({
              data: {
                account_name: form.values.accountName,
                phone: form.values.phone,
                email: form.values.email,
              },
              auth: auth,
            });
          }
        }}
      >
        <TextInput
          withAsterisk
          label="Account Name"
          placeholder="account name"
          key={form.key('accountName')}
          {...form.getInputProps('accountName')}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="account@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <Input.Wrapper withAsterisk label="Phone Number" key={form.key('phone')} {...form.getInputProps('phone')}>
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
            // onClick={async () => {
            //   await createAccountMutation.mutateAsync({
            //     data: {
            //       account_name: form.values.accountName,
            //       phone: form.values.phone,
            //       email: form.values.email,
            //     },
            //     auth: auth,
            //   });
            // }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};
