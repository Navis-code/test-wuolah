import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Logo from '../Logo';

const Header = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
      width="100vw"
      height="55px"
      backgroundColor="white"
      paddingY="0.5rem"
      display="flex"
      alignItems="center"
      boxShadow="sm"
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="100%"
        maxW={1480}
        mx="auto"
        px="6"
        wrap="wrap"
      >
        <Logo />
        <Box display="flex" gap="1rem">
          <Link href={'/'}>
            <a>Home</a>
          </Link>
          <Link href={'/universities'}>
            <a>Universities</a>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
