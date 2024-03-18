import ENVS from "./config/envs/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: ENVS.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
