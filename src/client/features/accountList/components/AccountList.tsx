import * as React from 'react';
import { Avatar, Text, Accordion, Group, TextInput, Divider, rem, ActionIcon, Skeleton } from '@mantine/core';
import { IconHome, IconSearch, IconPlus } from '@tabler/icons-react';
import classes from './AccountList.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccounts } from '../api/getAccounts';
import { Account } from '../types';
import { useAuth0 } from '@auth0/auth0-react';

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
const skeletonList = [
  { id: '1', name: 'Name', state: 'HI', sites: 0 },
  { id: '2', name: 'Name', state: 'HI', sites: 0 },
  { id: '3', name: 'Name', state: 'HI', sites: 0 },
  { id: '4', name: 'Name', state: 'HI', sites: 0 },
  { id: '5', name: 'Name', state: 'HI', sites: 0 },
];
export const AccountList = () => {
  const auth = useAuth0();
  const {
    data: accounts,
    error,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ['accounts', auth], queryFn: () => getAccounts(auth) });

  const skeletonItems = skeletonList.map((item) => (
    <Skeleton key={item.id}>
      <Accordion.Item value={item.id}>
        <Accordion.Control>
          <AccordionLabel {...item} />
        </Accordion.Control>
        <Accordion.Panel>
          <Text size="sm">{item.sites}</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Skeleton>
  ));
  const accountItems = accounts?.data.map((item: Account) => (
    <Accordion.Item key={item.id} value={item.id}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.sites}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));
  let items;
  if (isLoading) items = skeletonItems;
  if (isSuccess) items = accountItems;
  if (error) return <div>An error occurred</div>;

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
