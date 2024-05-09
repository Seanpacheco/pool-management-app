import * as React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Menu, rem } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { CreateSiteForm } from './createSiteForm';
import { modals } from '@mantine/modals';

export const CreateSiteModal = ({ account_Id }: { account_Id: string }) => {
  return (
    <>
      <Menu.Item
        onClick={() => {
          modals.open({
            title: 'Add Site',
            centered: true,
            children: <CreateSiteForm account_Id={account_Id} />,
          });
        }}
        leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
      >
        Add Site
      </Menu.Item>
    </>
  );
};
