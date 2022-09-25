import { FC } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { HOST_API } from '../config/links';

const client = new ApolloClient({
  uri: HOST_API,
  cache: new InMemoryCache(),
});

const CustomApolloProvider: FC = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default CustomApolloProvider;
