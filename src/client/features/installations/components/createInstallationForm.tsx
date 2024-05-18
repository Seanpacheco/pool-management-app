import * as React from 'react';
import { TextInput, Button, Group, Box, Input, Text, Center, Fieldset, Radio, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { UseCreateInstallation } from '../api/createInstallation';

export const CreateInstallationForm = ({ selectedSiteId }: { selectedSiteId: string }) => {
  const auth = useAuth0();
  const createInstallationMutation = UseCreateInstallation({}, auth, selectedSiteId); // Pass the required arguments to the useCreateAccount function

  const schema = z.object({
    installationName: z.string().min(2, { message: 'Installation name should have at least 2 letters' }),
    type: z.string().min(2, { message: 'Type should have at least 2 letters' }),
    shape: z.string().min(2, { message: 'Shape should have at least 2 letters' }),
    length: z.number({ message: 'Must be a number' }),
    width: z.number({ message: 'Must be a number' }),
    depth: z.number({ message: 'Must be a number' }),
    gallons: z.number({ message: 'Must be a number' }),
  });

  const form = useForm({
    initialValues: {
      installationName: '',
      type: '',
      shape: '',
      length: 0,
      width: 0,
      depth: 0,
      gallons: 0,
    },

    validate: zodResolver(schema),
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.installationName) {
      notifications.show({ message: 'Please fill installation name field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    }
  };
  if (createInstallationMutation.isPending) {
    return <PageLoadSpinner />;
  }
  if (createInstallationMutation.isSuccess)
    return (
      <Center>
        <Text size="lg">Installation Created Successfully</Text>
      </Center>
    );
  return (
    <Box maw={500} mx="auto">
      <form
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          createInstallationMutation.mutateAsync({
            data: {
              name: form.values.installationName,
              type: form.values.type,
              shape: form.values.shape,
              length: form.values.length,
              width: form.values.width,
              depth: form.values.depth,
              gallons: form.values.gallons,
              site_id: selectedSiteId,
            },
            auth: auth,
          });
          handleError(form.errors);
        }}
      >
        <TextInput
          withAsterisk
          label="Installation Name"
          placeholder="installation name"
          {...form.getInputProps('installationName')}
        />
        <Radio.Group name="Installation Type" label="Select the installation type" {...form.getInputProps('type')}>
          <Group mt="xs">
            <Radio value="pool" label="Pool" />
            <Radio value="spa" label="Spa" />
            <Radio value="pond" label="Pond" />
          </Group>
        </Radio.Group>
        <Radio.Group name="Installation Shape" label="Select the installation shape" {...form.getInputProps('shape')}>
          <Group mt="xs">
            <Radio value="rectangle" label="Rectangle" />
            <Radio value="square" label="Square" />
            <Radio value="circle" label="Circle" />
            <Radio value="oval" label="Oval" />
            <Radio value="irregular" label="Irregular" />
          </Group>
        </Radio.Group>
        <Fieldset legend="Dimensions" radius="xs">
          <NumberInput label="Length" placeholder="in ft." {...form.getInputProps('length')} />
          <NumberInput label="Width" placeholder="in ft." {...form.getInputProps('width')} />
          <NumberInput label="Depth" placeholder="in ft." {...form.getInputProps('depth')} />
          <NumberInput label="Gallons" placeholder="Gallons" {...form.getInputProps('gallons')} />
        </Fieldset>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
