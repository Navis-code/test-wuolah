import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUniversities } from '../../services/getUniversities';
import { Response, University } from '../../types';
import {
  Alert,
  AlertIcon,
  Container,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import UniversityListCard from '../../components/UniversityListCard';
import SkeletonListCard from '../../components/SkeletonListCard';
import Head from 'next/head';

const UniversitiesList: NextPage = (props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(['universities'], getUniversities, {
      getNextPageParam: (page: Response) =>
        page.meta.pagination.page === 50 ? null : page.meta.pagination.page + 1,
    });

  const universities = data?.pages?.map((page) => page.data).flat() || [];

  const renderUniversities = () => {
    if (isLoading) {
      return (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          <SkeletonListCard qty={[0, 1, 2, 3]} />
        </SimpleGrid>
      );
    }

    if (isError) {
      return (
        <Alert status="warning">
          <AlertIcon />
          Ups... something went wrong 🙃
        </Alert>
      );
    }

    return (
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
    );
  };

  return (
    <>
      <Head>
        <title>Wuolah | Universities</title>
        <meta
          name="description"
          content="Encuentra la universidad que buscas, y descubre los apuntes que otros estudiantes han compartido."
        />
        <meta name="keyword" content="Apuntes" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://test-wuolah.netlify.app/universities"
        />
        <meta property="og:title" content="Wuolah | Universities" />
        <meta
          property="og:description"
          content="Encuentra la universidad que buscas y descubre los apuntes que otros estudiantes han compartido."
        />
        <meta
          property="og:image"
          content="https://test-wuolah.netlify.app/wuolahLogo.png"
        ></meta>
      </Head>
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
        {renderUniversities()}
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
