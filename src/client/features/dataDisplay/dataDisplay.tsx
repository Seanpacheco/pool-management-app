import * as React from 'react';
import { Tabs, rem, Group, Divider, Combobox, useCombobox, Input, InputBase } from '@mantine/core';
import { IconFlask, IconClipboard, IconChartDots2, IconSettings } from '@tabler/icons-react';
import { CreateInstallationModal } from '../installations/components/createInstallationModal';
import { useInstallations } from '../installations/api/getInstallations';
import { useAuth0 } from '@auth0/auth0-react';
import { Installation } from '../installations/types';
import { CreateChemLogForm } from '../chemLogs/components/createChemLogForm';
import { ChemLogDataDisplay } from '../chemLogs/components/chemLogDataDisplay';
import { InstallationOptions } from '../installations/components/installationOptions';

export const DataDisplay = ({ selectedSiteId }: { selectedSiteId: string }) => {
  const auth = useAuth0();
  const iconStyle = { width: rem(20), height: rem(20) };
  const { installations, error, isLoading, isSuccess } = useInstallations(auth, selectedSiteId);
  const [installationData, setInstallationData] = React.useState<Installation[]>([]);
  const [value, setValue] = React.useState<string | null>(null);
  const [selectedInstallationName, setSelectedInstallationName] = React.useState<string | null>(null);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  React.useEffect(() => {
    if (isSuccess) setInstallationData([installations?.data]);
    setValue(null);
    setSelectedInstallationName(null);
  }, [installations?.data, isSuccess]);

  const options = installations?.data.map((item: Installation) => (
    <Combobox.Option
      key={item.installation_id}
      value={item.installation_id}
      onClick={() => setSelectedInstallationName(item.name)}
    >
      {item.name}
    </Combobox.Option>
  ));
  return (
    <>
      <Group justify="flex-end" grow>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {selectedInstallationName || <Input.Placeholder>Installations</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <CreateInstallationModal selectedSiteId={selectedSiteId} />
      </Group>
      <Divider my="md" />
      <Tabs variant="pills" defaultValue="chems">
        <Tabs.List grow>
          <Tabs.Tab value="chems" leftSection={<IconFlask style={iconStyle} />}>
            Chems
          </Tabs.Tab>
          <Tabs.Tab value="history" leftSection={<IconChartDots2 style={iconStyle} />}>
            History
          </Tabs.Tab>
          {/* <Tabs.Tab value="notes" leftSection={<IconClipboard style={iconStyle} />}>
            Notes
          </Tabs.Tab> */}
          <Tabs.Tab value="options" leftSection={<IconSettings style={iconStyle} />}>
            Options
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="chems">
          <CreateChemLogForm selectedInstallationId={value} />
        </Tabs.Panel>

        <Tabs.Panel value="history">
          <ChemLogDataDisplay selectedInstallationId={value} />
        </Tabs.Panel>

        <Tabs.Panel value="options">
          <InstallationOptions installationId={value} site_id={selectedSiteId} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
