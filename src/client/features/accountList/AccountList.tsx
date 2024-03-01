import * as React from 'react';
import { Stack, Avatar, Text, Accordion, Group, TextInput, Divider, rem, ActionIcon } from '@mantine/core';
import { IconHome, IconSearch, IconPlus } from '@tabler/icons-react';
import classes from './AccountList.module.css';

const accounts = [
  {
    id: '1',
    name: 'Alex Santos',
    state: 'HI',
    sites: 3,
  },
  {
    id: '2',
    name: 'Viva Wittman',
    state: 'HI',
    sites: 4,
  },
  {
    id: '3',
    name: 'Cliff Pacheco',
    state: 'HI',
    sites: 1,
  },
  {
    id: '4',
    name: 'Dywane Wade',
    state: 'HI',
    sites: 5,
  },
];

interface AccordionLabelProps {
  name: string;
  state: string;
  sites: number;
}

function AccordionLabel({ name, state }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar color="seaGreen" radius="xl" size="lg">
        <IconHome />
      </Avatar>
      <div>
        <Text>{name}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {state}
        </Text>
      </div>
    </Group>
  );
}

export const AccountList = () => {
  const items = accounts.map((item) => (
    <Accordion.Item value={item.id} key={item.name}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.sites}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  return (
    <>
      <Group justify="flex-end" grow>
        <TextInput placeholder="Search" rightSection={icon} />
        <ActionIcon
          variant="gradient"
          size="lg"
          aria-label="Gradient action icon"
          gradient={{ from: 'seaGreen.4', to: 'seaGreen.8', deg: 90 }}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      <Divider my="md" />
      <Accordion classNames={{ item: classes.item }} chevronPosition="right" variant="contained">
        {items}
      </Accordion>
    </>
  );
};
