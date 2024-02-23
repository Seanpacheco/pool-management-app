import * as React from 'react';
import { Container, Text, Button, Group } from '@mantine/core';

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
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'seaGreen.4', to: 'seaGreen.8' }}
          >
            Sign up
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
          >
            Log in
          </Button>
        </Group>
      </Container>
    </div>
  );
}
