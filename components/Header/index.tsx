import { Flex } from '@chakra-ui/react';
import Logo from '../Logo';

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="100%"
      maxW={1480}
      mx="auto"
      mt="4"
      px="6"
    >
      <Logo />
    </Flex>
  );
};

export default Header;
