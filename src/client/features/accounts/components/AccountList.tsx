import * as React from 'react';
import {
  Avatar,
  Text,
  Menu,
  Accordion,
  Group,
  TextInput,
  Divider,
  rem,
  Skeleton,
  Center,
  ActionIcon,
  Pagination,
  Flex,
} from '@mantine/core';
import { IconHome, IconSearch, IconDots, IconSettings, IconTrash, IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './AccountList.module.css';
import { useAccounts } from '../api/getAccounts';
import { useDeleteAccount } from '../api/deleteAccount';
import { Account } from '../types';
import { useAuth0 } from '@auth0/auth0-react';
import { CreateAccountModal } from './createAccountModal';
import { modals } from '@mantine/modals';
import { account } from '@/client/types/Account';
import { CreateSiteModal } from '../../sites/components/createSiteModal';
import { SiteList } from '../../sites/components/SiteList';
import { set } from 'zod';
import { useDebounce } from 'use-debounce';

interface AccordionLabelProps {
  account_id: string;
  account_name: string;
  phone: string;
  email: string;
}
// function DeleteConfirmationModal() {
//   const openDeleteModal = () =>
//     modals.openConfirmModal({
//       title: 'Delete this account?',
//       centered: true,
//       children: (
//         <Text size="sm">
//           Are you sure you want to delete this account? This action is destructive and irreversible.
//         </Text>
//       ),
//       labels: { confirm: 'Delete account', cancel: "No don't delete it" },
//       confirmProps: { color: 'red' },
//       onCancel: () => console.log('Cancel'),
//       onConfirm: () => console.log('Confirmed'),
//     });
// }

function AccordionLabel({ account_name, email, phone }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar color="seaGreen" radius="xl" size="lg">
        <IconHome />
      </Avatar>
      <div>
        <Text>{account_name}</Text>
        <Group wrap="nowrap" gap={10} mt={3}>
          <IconAt stroke={1.5} size="1.1rem" className={classes.icon} />
          <Text fz="1rem" c="dimmed">
            {email}
          </Text>
        </Group>
        <Group wrap="nowrap" gap={10} mt={5}>
          <IconPhoneCall stroke={1.5} size="1.1rem" className={classes.icon} />
          <Text fz="1rem" c="dimmed">
            {phone}
          </Text>
        </Group>
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
export const AccountList = ({ setSiteSelection }: { setSiteSelection: (site_id: string) => void }) => {
  const auth = useAuth0();

  const [accountData, setAccountData] = React.useState<Account[] | null>([]);
  const [selectedAccountId, setSelectedAccountId] = React.useState<string>('');
  const [activePage, setPage] = React.useState(1);
  const [active, setActive] = React.useState('');
  const [totalPages, setTotalPages] = React.useState(0);
  const [search, setSearch] = React.useState<string>(' ');
  const [debouncedSearch] = useDebounce(search, 300);

  const { accounts, error, isLoading, isSuccess } = useAccounts(auth, activePage, debouncedSearch);

  function handleAccountSelection(account_id: string) {
    setSelectedAccountId(account_id);
  }
  function handleSetActive(site_id: string) {
    setActive(site_id);
  }
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.currentTarget.value.toString());
    if (event.currentTarget.value != '') setSearch(event.currentTarget.value);
    else setSearch(' ');
  }

  React.useEffect(() => {
    if (isSuccess) setAccountData(accounts?.data);
    setTotalPages(Math.ceil(accounts?.data[0]?.full_count / 5));
  }, [accounts?.data, isSuccess]);

  const deleteAccountMutation = useDeleteAccount({}, auth);

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const openDeleteModal = (accountId: string) =>
    modals.openConfirmModal({
      title: 'Delete this account?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this account? This action is destructive and irreversible.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        deleteAccountMutation.mutateAsync({
          account_id: accountId,
          auth: auth,
        }),
    });
  // let items;
  if (isLoading)
    return (
      <>
        <Group justify="flex-end" grow>
          <TextInput placeholder="Search" rightSection={icon} />
          <CreateAccountModal />
        </Group>
        <Divider my="md" />
        <Accordion classNames={{ item: classes.item }} chevronPosition="right" variant="contained">
          {skeletonList.map((item) => (
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
          ))}
        </Accordion>
      </>
    );
  // items = skeletonItems;
  if (isSuccess)
    return (
      <>
        <Group justify="flex-end" grow>
          <TextInput
            placeholder="Search"
            value={search == ' ' ? '' : search}
            onChange={handleSearchChange}
            rightSection={icon}
          />
          <CreateAccountModal />
        </Group>
        <Divider my="md" />
        <Accordion classNames={{ item: classes.item }} chevronPosition="left" variant="contained">
          {accounts?.data?.map((item: Account) => (
            <Accordion.Item key={item.account_id} value={item.account_id}>
              <Center>
                <Accordion.Control
                  onClick={() => {
                    handleAccountSelection(item.account_id);
                  }}
                >
                  <AccordionLabel {...item} />
                </Accordion.Control>{' '}
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon className={classes.menuIcon} variant="subtle" size="lg">
                      <IconDots size="1.5rem" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Options</Menu.Label>
                    <CreateSiteModal account_Id={item.account_id} />
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                      Settings
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>

                    <Menu.Item
                      onClick={() => {
                        openDeleteModal(item.account_id);
                      }}
                      color="red"
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Delete Client Account
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Center>
              <Accordion.Panel>
                <SiteList
                  account_Id={item.account_id}
                  setSiteSelection={setSiteSelection}
                  active={active}
                  handleSetActive={handleSetActive}
                />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Flex justify="center">
          <Pagination value={activePage} onChange={setPage} total={totalPages ? totalPages : 0} />
        </Flex>
      </>
    );
  // items = accountItems;
  console.log(accounts.data);

  if (error) return <div>An error occurred</div>;

  // const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  // return (
  //   <>
  //     <Group justify="flex-end" grow>
  //       <TextInput placeholder="Search" rightSection={icon} />
  //       <CreateAccountModal />
  //     </Group>
  //     <Divider my="md" />
  //     <Accordion classNames={{ item: classes.item }} chevronPosition="right" variant="contained">
  //       {items}
  //     </Accordion>
  //   </>
  // );
};
