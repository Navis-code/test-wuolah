import { Box, Button, Container, Flex, Stack } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const Custom404Page: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>The page you were looking for doesn't exist | 404</title>
      </Head>
      <Header />
      <Container maxW="container.lg" marginTop="4rem">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
        >
          <p>Page not found</p>
          <Link href={'/'}>
            <Button colorScheme="gray" size="sm">
              Return to home page
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default Custom404Page;
