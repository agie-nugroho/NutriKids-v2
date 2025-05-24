const Hapi = require('@hapi/hapi');
const { PrismaClient } = require('@prisma/client');
const commentRoutes = require('./routes/comment');

const prisma = new PrismaClient();

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: { 
                origin: ['*'],
             }
        }
    });

    server.route(commentRoutes);

    await server.start();
    console.log('Server running: ', server.info.uri)
};

init()