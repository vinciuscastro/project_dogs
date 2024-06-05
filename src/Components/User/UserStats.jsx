import React from 'react';
import Head from '../Helper/Head';
import UseFetch from '../../Hooks/UseFetch';
import { STATS_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));


const UserStats = () => {
  const { data, loading, error, request } = UseFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);


  if (loading) return <Loading />;
  <Error error={error} />
  if (data)
    return <React.Suspense fallback={<div></div>}>
      <Head title="Estatísticas" />
      <UserStatsGraphs data={data} />
    </React.Suspense>;
  else return null;
};

export default UserStats;
