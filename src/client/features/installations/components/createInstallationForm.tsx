import * as React from 'react';
import { TextInput, Button, Group, Box, Input, Text, Center, Fieldset, Radio, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { UseCreateInstallation } from '../api/createInstallation';
import { site } from '@/client/types/Site';

export const CreateInstallationForm = ({ selectedSiteId }: { selectedSiteId: string }) => {
  const auth = useAuth0();
  const createInstallationMutation = UseCreateInstallation({}, auth, selectedSiteId); // Pass the required arguments to the useCreateAccount function

  const schema = z.object({
    installationName: z.string().min(2, { message: 'Installation name should have at least 2 letters' }),
    type: z.string().min(2, { message: 'Please select a type' }),
    shape: z.string().min(2, { message: 'Please select a shape' }),
    length: z.number({ message: 'Must be a number' }),
    width: z.number({ message: 'Must be a number' }),
    depth: z.number({ message: 'Must be a number' }),
    gallons: z.number({ message: 'Must be a number' }),
    site_id: z.string().uuid({ message: 'Please select a site' }),
  });

  const form = useForm({
    mode: 'uncontrolled',
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
    } else if (errors.site_id) {
      notifications.show({ message: 'Please select a site', color: 'red' });
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
          form.setFieldValue('site_id', selectedSiteId);
          if (form.validate().hasErrors === true) {
            handleError(form.errors);
          } else {
            createInstallationMutation.mutateAsync({
              data: {
                name: form.getValues().installationName,
                type: form.getValues().type,
                shape: form.getValues().shape,
                length: form.getValues().length,
                width: form.getValues().width,
                depth: form.getValues().depth,
                gallons: form.getValues().gallons,
                site_id: selectedSiteId,
              },
              auth: auth,
            });
          }
        }}
      >
        <TextInput
          withAsterisk
          label="Installation Name"
          placeholder="installation name"
          key={form.key('installationName')}
          {...form.getInputProps('installationName')}
        />
        <Radio.Group
          name="Installation Type"
          label="Select the installation type"
          key={form.key('type')}
          {...form.getInputProps('type')}
        >
          <Group mt="xs">
            <Radio value="pool" label="Pool" />
            <Radio value="spa" label="Spa" />
            <Radio value="pond" label="Pond" />
          </Group>
        </Radio.Group>
        <Radio.Group
          name="Installation Shape"
          label="Select the installation shape"
          key={form.key('shape')}
          {...form.getInputProps('shape')}
        >
          <Group mt="xs">
            <Radio value="rectangle" label="Rectangle" />
            <Radio value="square" label="Square" />
            <Radio value="circle" label="Circle" />
            <Radio value="oval" label="Oval" />
            <Radio value="irregular" label="Irregular" />
          </Group>
        </Radio.Group>
        <Fieldset legend="Dimensions" radius="xs">
          <NumberInput label="Length" placeholder="in ft." key={form.key('length')} {...form.getInputProps('length')} />
          <NumberInput label="Width" placeholder="in ft." key={form.key('width')} {...form.getInputProps('width')} />
          <NumberInput label="Depth" placeholder="in ft." key={form.key('depth')} {...form.getInputProps('depth')} />
          <NumberInput
            label="Gallons"
            placeholder="Gallons"
            key={form.key('gallons')}
            {...form.getInputProps('gallons')}
          />
        </Fieldset>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
