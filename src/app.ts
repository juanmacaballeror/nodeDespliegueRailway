
import { evens } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server'

function main() {
    const server = new Server({
        port: evens.PORT,
        public_path: evens.PUBLIC_PATH,
        routes: AppRoutes.routes,
    })
    server.start();
}

(() => {
    main()
})()
