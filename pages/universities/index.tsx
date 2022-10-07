import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUniversities } from '../../services/getUniversities';
import { Response, University } from '../../types';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import Header from '../../components/Header';
import UniversityListCard from '../../components/UniversityListCard';

const UniversitiesList: NextPage = (props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(['universities'], getUniversities, {
      getNextPageParam: (page: Response) =>
        page.meta.pagination.page === 50 ? null : page.meta.pagination.page + 1,
    });

  const universities = data?.pages?.map((page) => page.data).flat() || [];

  if (isLoading) {
    return <div>Loading...⌛</div>;
  }

  if (isError) {
    return <div>Ups... something went wrong 🙃</div>;
  }

  return (
    <>
      <Header />
      <Container maxW="container.lg" marginTop="4rem">
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }} textAlign="center">
          Universidades.
        </Heading>
        <Heading
          as="h2"
          size={{ base: 'md', md: 'xl' }}
          textAlign="center"
          marginBottom="2rem"
        >
          ¿En qué universidad estudias?
        </Heading>
        <InfiniteScroll
          dataLength={universities?.length!}
          hasMore={hasNextPage as boolean}
          next={() => fetchNextPage()}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>Yay! You have seen it all</h4>}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {universities?.map((university: University) => (
              <UniversityListCard
                key={university.id}
                {...university}
              ></UniversityListCard>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['universities'], getUniversities);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default UniversitiesList;
