import * as React from 'react';
import { Group, Divider, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { LogOutButton } from '../../features/auth/components/LogOutButton';

import { useDisclosure } from '@mantine/hooks';
import classes from './MainLayout.module.css';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <>
      <Box pb={50}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <h1 className={classes.logo}>Pool Manager</h1>

            <Group visibleFrom="sm">
              <LogOutButton />
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <LogOutButton />
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
      <main>{children}</main>
    </>
  );
};
