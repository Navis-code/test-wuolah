import { Alert, AlertIcon, Container, Heading } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import SkeletonListCard from '../../components/SkeletonListCard';
import UniversityDetailCard from '../../components/UniversityDetailCard';
import { getUniversityBySlug } from '../../services/getUniversityBySlug';

function UniversityDetails() {
  const router = useRouter();
  const slug = typeof router.query?.slug === 'string' ? router.query.slug : '';

  const {
    data: university,
    isLoading,
    isError,
  } = useQuery(['university', slug], () => getUniversityBySlug(slug));

  const renderUniversity = () => {
    if (isLoading) {
      return <SkeletonListCard qty={[0]} />;
    }

    if (isError) {
      return (
        <Alert status="warning">
          <AlertIcon />
          Ups... something went wrong 🙃
        </Alert>
      );
    }

    const { id } = university;
    return (
      <UniversityDetailCard key={id} {...university}></UniversityDetailCard>
    );
  };

  return (
    <>
      <Head>
        <title>Wuolah | University</title>

        <meta
          name="description"
          content="Los apuntes de la universidad de tu ciudad"
        />
        <meta name="keyword" content="Apuntes" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://test-wuolah.netlify.app" />
        <meta property="og:title" content="Wuolah" />
        <meta
          property="og:description"
          content="Los apuntes de la universidad de tu ciudad"
        />
        <meta
          property="og:image"
          content="https://test-wuolah.netlify.app/wuolahLogo.png"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxW="container.lg" marginTop="4rem">
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
          {university?.name || 'University Details'}
        </Heading>
        <Heading as="h2" size={{ base: 'md', md: 'xl' }} mb="2rem">
          Facultad o escuelas
        </Heading>
        {renderUniversity()}
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
