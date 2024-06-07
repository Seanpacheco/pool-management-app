import * as React from 'react';
import { TextInput, Button, Group, Box, Input, Text, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IMaskInput } from 'react-imask';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useCreateSite } from '../api/createSite';

export const CreateSiteForm = ({ account_Id }: { account_Id: string }) => {
  const auth = useAuth0();
  const createSiteMutation = useCreateSite({}, auth, account_Id); // Pass the required arguments to the useCreateSite function

  const schema = z.object({
    account_id: z.string().uuid({ message: 'Please select an account' }),
    address: z.string().min(2, { message: 'Address should have at least 2 letters' }),
    postal_code: z.string().min(5, { message: 'Postal code should have at least 5 digits' }),
    phone: z.string().min(17, { message: 'Phone should have at least 11 digits' }),
    email: z.string().email({ message: 'Invalid email address' }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      address: '',
      postal_code: '',
      phone: '',
      email: '',
    },
    validate: zodResolver(schema),
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.address) {
      notifications.show({ message: 'Please fill out the address field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    }
  };
  if (createSiteMutation.isPending) {
    return <PageLoadSpinner />;
  }
  if (createSiteMutation.isSuccess)
    return (
      <Center>
        <Text size="lg">Site Created Successfully</Text>
      </Center>
    );
  return (
    <Box maw={500} mx="auto">
      <form
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          form.setFieldValue('account_id', account_Id); // Set the account_id to the account_Id passed in the props
          if (form.validate().hasErrors === true) {
            console.log(form.errors);
            handleError(form.errors);
          } else {
            createSiteMutation.mutateAsync({
              data: {
                address: form.getValues().address,
                phone: form.getValues().phone,
                email: form.getValues().email,
                postal_code: form.getValues().postal_code,
                account_id: account_Id,
              },
              auth: auth,
            });
          }
        }}
      >
        <TextInput
          withAsterisk
          label="Address"
          placeholder="address"
          key={form.key('address')}
          {...form.getInputProps('address')}
        />
        <TextInput
          withAsterisk
          label="Postal Code"
          placeholder="postal code"
          key={form.key('postal_code')}
          {...form.getInputProps('postal_code')}
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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
