const hapi = require("hapi");
const path = require("path");

const DIST_PATH = "dist";

const server = hapi.server({
    port: process.env.PORT || 8080,
    routes: {
        files: {
            relativeTo: path.join(__dirname, DIST_PATH),
        },
    },
});

async function start() {
    await server.register(require("inert"));
    server.route({
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: ".",
                redirectToSlash: true,
                index: true,
            },
        },
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

start().catch(error => console.error(error));
