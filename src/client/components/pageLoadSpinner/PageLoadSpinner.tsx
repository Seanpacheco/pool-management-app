import * as React from 'react';
import { Loader, Container, Center } from '@mantine/core';
import classes from './PageLoadSpinner.module.css';

export const PageLoadSpinner = () => {
  return (
    <Container className={classes.container} fluid>
      <Center className={classes.center}>
        <Loader size={'xl'} />
      </Center>
    </Container>
  );
};
