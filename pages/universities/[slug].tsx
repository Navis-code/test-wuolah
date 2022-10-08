import { Container, Heading } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import UniversityDetailCard from '../../components/UniversityDetailCard';
import { getUniversityBySlug } from '../../services/getUniversityBySlug';

function UniversityDetails(props: any) {
  const router = useRouter();
  const slug = typeof router.query?.slug === 'string' ? router.query.slug : '';

  const {
    data: university,
    isLoading,
    isError,
  } = useQuery(['university', slug], () => getUniversityBySlug(slug));

  if (isLoading) {
    return <div>Loading...⌛</div>;
  }

  if (isError) {
    return <div>Ups... something went wrong 🙃</div>;
  }

  const { id, name } = university;

  return (
    <>
      <Header />
      <Container maxW="container.lg" marginTop="4rem">
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
          {name}
        </Heading>
        <Heading as="h2" size={{ base: 'md', md: 'xl' }} mb="2rem">
          Facultad o escuelas
        </Heading>
        <UniversityDetailCard key={id} {...university}></UniversityDetailCard>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const queryClient = new QueryClient();
    const { slug } = context.params;

    await queryClient.prefetchQuery(['university', slug], () =>
      getUniversityBySlug(slug as string)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
  return {
    notFound: true,
  };
};

export default UniversityDetails;
