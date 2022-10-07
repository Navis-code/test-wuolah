import { Avatar, Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { University } from '../../types';

const UniversityCard = ({ id, logoUrl, name, slug, shortName }: University) => (
  <Center py={6}>
    <Box
      maxW={'320px'}
      minH={'320px'}
      w={'full'}
      bg={'white'}
      boxShadow={{ base: 'md', sm: 'xl' }}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      border={'1px solid #e2e8f0'}
    >
      <Avatar
        size={'xl'}
        src={logoUrl}
        mb={4}
        pos={'relative'}
        objectFit={'scale-down'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {shortName}
      </Heading>
      <Text textAlign={'center'} px={3} mt={2} noOfLines={1}>
        {name}
      </Text>
      <Stack mt={8} direction={'row'} spacing={4}>
        <Link href={`/universities/${id}`}>
          <a className="link-btn">Ver</a>
        </Link>
      </Stack>
    </Box>
  </Center>
);

export default UniversityCard;
