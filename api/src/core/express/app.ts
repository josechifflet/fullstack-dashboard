import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import morgan from 'morgan';

import config from '../../config';
import AttendanceRouter from '../../v1/attendance/router';
import AuthRouter from '../../v1/auth/router';
import HealthRouter from '../../v1/health/router';
import SessionRouter from '../../v1/session/routes';
import UserRouter from '../../v1/user/router';
import { intializeApolloServer } from '../apollo/server';
import errorHandler from '../errorHandler';
import accept from '../middleware/accept';
import busyHandler from '../middleware/busy-handler';
import { errorLogger, successLogger } from '../middleware/logger';
import notFound from '../middleware/not-found';
import session from '../middleware/session';
import slowDown from '../middleware/slow-down';
import xPoweredBy from '../middleware/x-powered-by';
import xRequestedWith from '../middleware/x-requested-with';
import { startServer } from './start-server';

const App = async () => {
  // Create Express application.
  const app = express();
  const httpServer = http.createServer(app);

  if (config.NODE_ENV === 'production')
    app.use(
      morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
      )
    );
  else app.use(morgan('dev'));

  const apolloServer = await intializeApolloServer(httpServer);
  app.use('/graphql', cors(), json(), expressMiddleware(apolloServer));

  // Allow proxies on our nginx server in production.
  if (config.NODE_ENV === 'production') app.enable('trust proxy');

  // Security headers.
  app.use(helmet({ frameguard: { action: 'deny' }, hidePoweredBy: false }));

  // Enable special `X-Powered-By` header.
  app.use(xPoweredBy());

  // Check for CSRF via the Header method.
  app.use(xRequestedWith());

  // Validate `Accept` header.
  app.use(accept());

  // Handle if server is too busy.
  app.use(busyHandler());

  // Load signed cookie parser. JSON parser is loaded in each required
  // endpoints in a case-by-case basis.
  app.use(cookieParser(config.SESSION_SECRET));

  // Prevent parameter pollution.
  app.use(hpp());

  app.use(session());

  // Log requests (successful requests).
  app.use(successLogger);

  // Define API routes. Throttle '/api' route to prevent spammers.
  app.use('/api', slowDown(75));
  app.use('/api/v1', HealthRouter());
  app.use('/api/v1/auth', AuthRouter());
  app.use('/api/v1/attendances', AttendanceRouter());
  app.use('/api/v1/sessions', SessionRouter());
  app.use('/api/v1/users', UserRouter());

  // Catch-all routes for API.
  app.all('*', notFound());

  // Log errors.
  app.use(errorLogger);

  // Define error handlers.
  app.use(errorHandler);

  await startServer(httpServer);
};

export default App;
