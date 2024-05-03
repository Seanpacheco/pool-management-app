import * as React from 'react';
import { TextInput, Button, Group, Box, Input, Text, Center, Fieldset, Radio, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IMaskInput } from 'react-imask';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const CreateSiteForm = (accountId) => {
  const auth = useAuth0();
  // const createAccountMutation = useCreateAccount({}, auth); // Pass the required arguments to the useCreateAccount function

  const schema = z.object({
    address: z.string().min(2, { message: 'Address should have at least 2 letters' }),
    postal_code: z.string().min(5, { message: 'Postal code should have at least 5 digits' }),
    phone: z.string().min(17, { message: 'Phone should have at least 11 digits' }),
    email: z.string().email({ message: 'Invalid email address' }),
  });

  const form = useForm({
    initialValues: {
      address: '',
      postal_code: '',
      phone: '',
      email: '',
    },
    validate: zodResolver(schema),
  });

  // const handleError = (errors: typeof form.errors) => {
  //   if (errors.installationName) {
  //     notifications.show({ message: 'Please fill installation name field', color: 'red' });
  //   } else if (errors.email) {
  //     notifications.show({ message: 'Please provide a valid email', color: 'red' });
  //   }
  // };
  // if (createAccountMutation.isPending) {
  //   return <PageLoadSpinner />;
  // }
  // if (createAccountMutation.isSuccess)
  //   return (
  //     <Center>
  //       <Text size="lg">Account Created Successfully</Text>
  //     </Center>
  //   );
  return (
    <Box maw={500} mx="auto">
      <form
      // method="POST"
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   createAccountMutation.mutateAsync({
      //     data: {
      //       account_name: form.values.accountName,
      //       phone: form.values.phone,
      //       email: form.values.email,
      //     },
      //     auth: auth,
      //   });
      //   handleError(form.errors);
      // }}
      >
        <TextInput withAsterisk label="Address" placeholder="address" {...form.getInputProps('address')} />
        <TextInput withAsterisk label="Postal Code" placeholder="postal code" {...form.getInputProps('postal_Code')} />
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
