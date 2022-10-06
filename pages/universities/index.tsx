import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Response, University } from '../../types';

const UniversitiesList: NextPage<{ universities: University[] }> = ({
  universities,
}) => {
  return (
    <>
      <h1>Universities List</h1>
      <ul>
        {universities.map((university: University) => (
          <li key={university.id}>
            <Link href={`/universities/${university.id}`}>
              <a>{university.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://api.wuolah.com/v2/universities');
  const { data: universities, meta }: Response = await res.json();
  return {
    props: { universities },
  };
};

export default UniversitiesList;
