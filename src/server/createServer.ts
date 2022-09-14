import Hapi from '@hapi/hapi';
import config from './config';

import { initMockRoutes } from './routes/index';

async function createServer(): Promise<Hapi.Server> {
  const server = await new Hapi.Server({
    host: config.host,
    port: config.port,
  });

  if (config.useMocks) {
    initMockRoutes(server);
  }

  try {
    await server.start();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(err));
  }

  return server;
}

export default createServer;
