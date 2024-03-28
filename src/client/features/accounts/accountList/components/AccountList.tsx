import * as React from 'react';
import { Avatar, Text, Accordion, Group, TextInput, Divider, rem, Skeleton } from '@mantine/core';
import { IconHome, IconSearch } from '@tabler/icons-react';
import classes from './AccountList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '../api/getAccounts';
import { Account } from '../types';
import { useAuth0 } from '@auth0/auth0-react';
import { CreateAccountModal } from '../../createAccount/components/createAccountModal';

interface AccordionLabelProps {
  account_id: string;
  account_name: string;
  phone: string;
  email: string;
}

function AccordionLabel({ account_name, email }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar color="seaGreen" radius="xl" size="lg">
        <IconHome />
      </Avatar>
      <div>
        <Text>{account_name}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {email}
        </Text>
      </div>
    </Group>
  );
}
const skeletonList = [
  { account_id: '2', account_name: 'Name', phone: '123456789', email: 'email' },
  { account_id: '3', account_name: 'Name', phone: '123456789', email: 'email' },
  { account_id: '1', account_name: 'Name', phone: '123456789', email: 'email' },
  { account_id: '4', account_name: 'Name', phone: '123456789', email: 'email' },
  { account_id: '5', account_name: 'Name', phone: '123456789', email: 'email' },
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
    <Skeleton key={item.account_id}>
      <Accordion.Item value={item.account_id}>
        <Accordion.Control>
          <AccordionLabel {...item} />
        </Accordion.Control>
        <Accordion.Panel>
          <Text size="sm">{item.phone}</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Skeleton>
  ));
  const accountItems = accounts?.data.map((item: Account) => (
    <Accordion.Item key={item.account_id} value={item.account_id}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.phone}</Text>
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
        <CreateAccountModal />
      </Group>
      <Divider my="md" />
      <Accordion classNames={{ item: classes.item }} chevronPosition="right" variant="contained">
        {items}
      </Accordion>
    </>
  );
};
