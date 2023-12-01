import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { DEFAULT_PORT } from './config/constants';
import connectToMongo from './services/connectToMongo';
import startApollo from './services/startApollo';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const expressApp = express();

expressApp.use(cors({ origin: '*' }));
expressApp.use(cookieParser());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use('/static', express.static(path.join(__dirname, '..', 'static')));

if (process.env.NODE_ENV === 'production') {
  expressApp.use('/', express.static(path.join(__dirname, '../..', 'react/build')));
}

const port = (process.env.PORT && parseInt(process.env.PORT)) || DEFAULT_PORT;

const startTheApp = async () => {
  const connection = await connectToMongo();
  const { apolloServer } = await startApollo(expressApp);
  expressApp.listen(port, () => console.info(`Express Server ready at http://localhost:${port}`));

  console.log(`Apollo Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
};

startTheApp();

// export default startTheApp
