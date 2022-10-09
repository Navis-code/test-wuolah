import { Box, Center, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const SkeletonListCard = ({ qty }: { qty: number[] }) => {
  const skeletonQty = Array.from(qty, (el, index) => index);

  return (
    <>
      {skeletonQty.map((el, index) => (
        <Center py={6} key={index}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxW="320px"
            minH="320px"
            w="full"
            boxShadow={{ base: 'md', sm: 'xl' }}
            border="1px solid #e2e8f0"
            p="6"
            rounded="lg"
          >
            <SkeletonCircle size="96px" mb="1rem" />
            <Skeleton height="28px" mb="1rem" w="100%" />
            <Skeleton height="24px" mb="1rem" w="100%" />
            <Skeleton height="45px" w="100%" />
          </Box>
        </Center>
      ))}
    </>
  );
};

export default SkeletonListCard;
