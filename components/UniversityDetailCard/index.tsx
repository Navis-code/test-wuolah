import { Avatar, Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';
import { University } from '../../types';

const UniversityDetailCard = ({
  logoUrl,
  name,
  slug,
  shortName,
  id,
}: University) => (
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
    />
    <Heading fontSize={'2xl'} fontFamily={'body'}>
      {shortName}
    </Heading>
    <Text textAlign={'center'} px={3} mt={2} noOfLines={1}>
      {name}
    </Text>
    <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>
      <Badge px={2} py={1} bg="gray.100" fontWeight={'400'}>
        #{id}
      </Badge>
      <Badge px={2} py={1} bg="gray.100" fontWeight={'400'} noOfLines={1}>
        #{slug}
      </Badge>
    </Stack>
  </Box>
);

export default UniversityDetailCard;
