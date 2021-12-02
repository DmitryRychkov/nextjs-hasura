import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: 'http://localhost:8080/v1/graphql',
  headers: {
    "x-hasura-admin-secret": 'myadminsecretkey',
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
