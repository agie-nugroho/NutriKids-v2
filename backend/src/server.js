const Hapi = require('@hapi/hapi');
const { PrismaClient } = require('@prisma/client');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const saveMenuRoutes = require('./routes/save-menu');

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
    server.route(authRoutes);
    server.route(userRoutes);
    server.route(saveMenuRoutes);

    await server.start();
    console.log('Server running: ', server.info.uri)
};

init()