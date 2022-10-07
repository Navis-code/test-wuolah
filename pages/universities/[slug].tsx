import {
  Avatar,
  Badge,
  Box,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Header from '../../components/Header';
import UniversityDetailCard from '../../components/UniversityDetailCard';
import { University } from '../../types';

function UniversityDetails(university: University) {
  const { id, name, shortName, slug, logoUrl } = university;
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await fetch(
    `https://api.wuolah.com/v2/universities/${params.slug}`
  );
  const university: University = await res.json();
  return {
    props: university,
  };
};

export default UniversityDetails;
