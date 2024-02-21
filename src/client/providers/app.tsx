import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';

import { Title, Text, Button, Container, Group, Loader } from '@mantine/core';
import classes from './ServerError.module.css';

const myColor: MantineColorsTuple = [
  '#f0f9f8',
  '#e3f0ee',
  '#c2e1dc',
  '#9dd0c8',
  '#7fc3b8',
  '#6cbbad',
  '#60b8a8',
  '#50a192',
  '#449082',
  '#317d70',
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

const ErrorFallback = () => {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try
          refreshing the page.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Loader size={'xl'} />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
