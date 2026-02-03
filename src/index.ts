import { Server } from './Server';

(async function () {
  const server = Server.init();
  server.listen();
})().catch((err)=>{
  console.error('Failed to start application', err);
  process.exit(1);
});
