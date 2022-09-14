import Hapi from '@hapi/hapi';

export function initMockRoutes(server: Hapi.Server): void {
  server.route({
    handler: (_, h) => h.response({ name: 'Alex' }),
    method: 'GET',
    path: '/api/users',
  });
}
