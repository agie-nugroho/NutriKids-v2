const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const { PrismaClient } = require("@prisma/client");
const commentRoutes = require("./routes/comment");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const saveMenuRoutes = require("./routes/save-menu");

const prisma = new PrismaClient();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
     host: "0.0.0.0", 
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(Inert);

   server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: Path.join(__dirname, "dist"),
        index: ["index.html"],
      },
    },
  });

  server.route(commentRoutes);
  server.route(authRoutes);
  server.route(userRoutes);
  server.route(saveMenuRoutes);

  await server.start();
  console.log("Server running: ", server.info.uri);
};

init();
