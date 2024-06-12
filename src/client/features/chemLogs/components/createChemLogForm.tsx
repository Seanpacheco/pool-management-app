import * as React from 'react';
import { Button, Group, Box, Text, Center, Fieldset, NumberInput, Slider, SegmentedControl, Flex } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { UseCreateChemLog } from '../api/createChemLog';

export const CreateChemLogForm = ({ selectedInstallationId }: { selectedInstallationId: string | null }) => {
  const auth = useAuth0();
  const createChemLogMutation = UseCreateChemLog({}, auth, selectedInstallationId); // Pass the required arguments to the useCreateAccount function

  const [value, setValue] = React.useState<Date | null>(null);
  const [selectedSanitizer, setSelectedSanitizer] = React.useState<string>('chlorine');

  const schema = z.object({
    installation_id: z.string().uuid({ message: 'Please select an installation' }),
    sanitizerLevel: z.number({ message: 'Must be a number' }),
    phLevel: z.number({ message: 'Must be a number' }),
    alkalinityLevel: z.number({ message: 'Must be a number' }).nullable(),
    calciumLevel: z.number({ message: 'Must be a number' }).nullable(),
    totalDissolvedSolidsLevel: z.number({ message: 'Must be a number' }).nullable(),
    cyanuricAcidLevel: z.number({ message: 'Must be a number' }).nullable(),
    logDate: z.date({ message: 'Must pick a date' }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      sanitizerLevel: 3,
      phLevel: 7.6,
      alkalinityLevel: null,
      calciumLevel: null,
      totalDissolvedSolidsLevel: null,
      cyanuricAcidLevel: null,
      logDate: null,
    },

    validate: zodResolver(schema),
  });

  const handleDateChange = (value: any) => {
    setValue(value);
    form.getInputProps('logDate');
    form.setFieldValue('logDate', value);
  };

  const handleError = (errors: typeof form.errors) => {
    if (errors.installation_id) {
      notifications.show({ message: 'Please select an installation', color: 'red' });
    } else if (errors.logDate) {
      notifications.show({ message: 'Please Select a date', color: 'red' });
    }
  };
  if (createChemLogMutation.isIdle) {
    return (
      <Box maw={500} mx="auto">
        <Fieldset legend="Chem Logger">
          <form
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();

              form.setFieldValue('installation_id', selectedInstallationId);
              if (form.validate().hasErrors === true) {
                handleError(form.errors);
              } else {
                createChemLogMutation.mutateAsync({
                  data: {
                    sanitizer_level: form.getValues().sanitizerLevel,
                    sanitizer_type: selectedSanitizer,
                    ph_level: form.getValues().phLevel,
                    alkalinity_level: form.getValues().alkalinityLevel,
                    calcium_level: form.getValues().calciumLevel,
                    total_dissolved_solids_level: form.getValues().totalDissolvedSolidsLevel,
                    cyanuric_acid_level: form.getValues().cyanuricAcidLevel,
                    installation_id: selectedInstallationId,
                    log_date: form.getValues().logDate,
                  },
                  auth: auth,
                });
              }
            }}
          >
            <Flex justify="center" gap="md" direction="column">
              <DatePickerInput
                label="Date"
                placeholder="Date"
                withAsterisk
                error={form.errors.logDate}
                value={value}
                onChange={handleDateChange}
                key={form.key('logDate')}
              />
              <Fieldset legend="Chem Levels">
                <Flex direction="column" gap="lg">
                  <Flex direction="column" gap="xl">
                    <SegmentedControl
                      color="seaGreen"
                      value={selectedSanitizer}
                      onChange={setSelectedSanitizer}
                      data={[
                        { label: 'Chlorine', value: 'chlorine' },
                        { label: 'Bromine', value: 'bromine' },
                      ]}
                    />
                    {selectedSanitizer === 'chlorine' ? (
                      <Slider
                        size="lg"
                        labelAlwaysOn
                        defaultValue={5}
                        max={10}
                        step={0.5}
                        marks={[
                          { value: 0, label: '0' },
                          { value: 1, label: '1' },
                          { value: 2, label: '2' },
                          { value: 3, label: '3' },
                          { value: 5, label: '5' },
                          { value: 7.5, label: '7.5' },
                          { value: 10, label: '10' },
                        ]}
                        {...form.getInputProps('sanitizerLevel')}
                        key={form.key('sanitizerLevel')}
                      />
                    ) : (
                      <Slider
                        size="lg"
                        labelAlwaysOn
                        defaultValue={10}
                        max={20}
                        step={0.5}
                        marks={[
                          { value: 0, label: '0' },
                          { value: 2, label: '2' },
                          { value: 4, label: '4' },
                          { value: 6, label: '6' },
                          { value: 10, label: '10' },
                          { value: 15, label: '15' },
                          { value: 20, label: '20' },
                        ]}
                        {...form.getInputProps('sanitizerLevel')}
                        key={form.key('sanitizerLevel')}
                      />
                    )}
                    <Flex direction="column">
                      <Text size="sm" mt="xl">
                        PH
                      </Text>
                      <Slider
                        defaultValue={7.6}
                        labelAlwaysOn
                        min={7}
                        max={8}
                        step={0.1}
                        marks={[
                          { value: 7, label: '7' },
                          { value: 7.2, label: '7.2' },
                          { value: 7.4, label: '7.4' },
                          { value: 7.6, label: '7.6' },
                          { value: 7.8, label: '7.8' },
                          { value: 8, label: '8' },
                        ]}
                        {...form.getInputProps('phLevel')}
                        key={form.key('phLevel')}
                      />
                    </Flex>
                  </Flex>
                  <NumberInput
                    label="Alkalinity"
                    allowNegative={false}
                    placeholder="parts per million"
                    {...form.getInputProps('alkalinityLevel')}
                    key={form.key('alkalinityLevel')}
                  />
                  <NumberInput
                    label="Calcium"
                    allowNegative={false}
                    placeholder="parts per million"
                    {...form.getInputProps('calciumLevel')}
                    key={form.key('calciumLevel')}
                  />
                  <NumberInput
                    label="Total Dissolved Solids"
                    allowNegative={false}
                    placeholder="parts per million"
                    {...form.getInputProps('totalDissolvedSolidsLevel')}
                    key={form.key('totalDissolvedSolidsLevel')}
                  />
                  <NumberInput
                    label="Cynaurc Acid"
                    allowNegative={false}
                    placeholder="parts per million"
                    {...form.getInputProps('cyanuricAcidLevel')}
                    key={form.key('cyanuricAcidLevel')}
                  />
                </Flex>
              </Fieldset>
              <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Flex>
          </form>
        </Fieldset>
      </Box>
    );
  }
  if (createChemLogMutation.isPending) {
    return <PageLoadSpinner />;
  }
  if (createChemLogMutation.isSuccess)
    return (
      <Box maw={500} mx="auto">
        <Center>
          <Flex justify="center" gap="md" direction="column">
            <Text size="lg">Chem Log Saved Successfully</Text>
            <Button onClick={createChemLogMutation.reset}>Submit a New Log</Button>
          </Flex>
        </Center>
      </Box>
    );
};
