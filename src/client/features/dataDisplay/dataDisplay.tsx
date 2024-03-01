import * as React from 'react';
import { Tabs, rem } from '@mantine/core';
import { IconFlask, IconClipboard, IconChartDots2, IconChartCandle } from '@tabler/icons-react';

export const DataDisplay = () => {
  const iconStyle = { width: rem(20), height: rem(20) };

  return (
    <Tabs variant="pills" defaultValue="chems">
      <Tabs.List grow>
        <Tabs.Tab value="chems" leftSection={<IconFlask style={iconStyle} />}>
          Chems
        </Tabs.Tab>
        <Tabs.Tab value="history" leftSection={<IconChartDots2 style={iconStyle} />}>
          History
        </Tabs.Tab>
        <Tabs.Tab value="notes" leftSection={<IconClipboard style={iconStyle} />}>
          Notes
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chems">Chem tab content</Tabs.Panel>

      <Tabs.Panel value="history">History tab content</Tabs.Panel>

      <Tabs.Panel value="notes">Notes tab content</Tabs.Panel>
    </Tabs>
  );
};
