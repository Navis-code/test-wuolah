import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUniversities } from '../../services/getUniversities';
import { Response, University } from '../../types';

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
      <h1>Universities List</h1>
      <InfiniteScroll
        dataLength={universities?.length!}
        hasMore={hasNextPage as boolean}
        next={() => fetchNextPage()}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>Yay! You have seen it all</h4>}
      >
        <ul>
          {universities?.map((university: University) => (
            <li key={university.id}>
              <Link href={`/universities/${university.id}`}>
                <a>{university.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
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
