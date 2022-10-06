import { GetServerSideProps } from 'next';
import { University } from '../../types';

export default function UniversityDetails({
  id,
  name,
  slug,
  shortName,
  logoUrl,
}: University) {
  return (
    <h1>
      Universidad {id}, {name}, {slug}, {shortName}, {logoUrl}
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await fetch(
    `https://api.wuolah.com/v2/universities/${params.id}`
  );
  const university: University = await res.json();
  return {
    props: university,
  };
};