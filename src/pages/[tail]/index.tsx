import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

const QUERY = gql`
  query getJsonId($tail: String!) {
    test(where: { tail: { _eq: $tail } }) {
      tail
      json_id
    }
  }
`;

const Tail: NextPage = () => {
  const router = useRouter();
  const { tail } = router.query;

  const [jsonData, setJsonData] = useState<{id: number; title: string; description: string}[] | null>(null);

  const { loading, error, data } = useQuery(QUERY, {variables: {tail}});

  useEffect(() => {
    fetch('/file.json').then((response) => {
      response.json().then((data) => {
        setJsonData(data);
      });
    });
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <pre>{JSON.stringify(error.message)}</pre>;
  }

  const json_id = data.test[0]?.json_id;

  const result = jsonData?.find((item) => item.id === json_id);

  if(!result) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <p>{result?.title}</p>
      <p>{result?.description}</p>
    </div>
  );
};

export default Tail;
