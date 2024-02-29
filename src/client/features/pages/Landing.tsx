import * as React from 'react';
import { Container, Text, Affix, Group } from '@mantine/core';
import { LogInButton } from '../auth/components/LogInButton';
import { SignUpButton } from '../auth/components/SignUpButton';
import { LightDarkToggle } from '../LightDarkToggle/LightDarkToggle';

import classes from './LandingPage.module.css';

export function LandingPage() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'seaGreen.4', to: 'seaGreen.8' }} inherit>
            fully featured
          </Text>{' '}
          Pool management system
        </h1>
        <Text className={classes.description} color="dimmed">
          Manage your pool and spa, track your chemical levels, get reccomendations and more.
        </Text>
        <Group className={classes.controls}>
          <SignUpButton />

          <LogInButton />
        </Group>{' '}
      </Container>
      <Affix position={{ bottom: 20, right: 20 }}>
        <LightDarkToggle />
      </Affix>
    </div>
  );
}
