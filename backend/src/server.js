require("dotenv").config(); 
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const { PrismaClient } = require("@prisma/client");
const Path = require("path")

const commentRoutes = require("./routes/comment");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const saveMenuRoutes = require("./routes/save-menu");

const prisma = new PrismaClient();
const FRONTEND_URL = "https://nutrikids-v2-production-a1b6.up.railway.app";

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0", 
    routes: {
      cors: {
        origin: [FRONTEND_URL],
        credentials: true,
        additionalHeaders: ['cache-control', 'x-requested-with'],
        additionalExposedHeaders: ['authorization'],
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

   server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (request.method === "options") {
      return h
        .response()
        .code(200)
        .header("Access-Control-Allow-Origin", FRONTEND_URL)
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    if (response.isBoom) {
      response.output.headers["Access-Control-Allow-Origin"] = "*";
      response.output.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
      response.output.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    } else if (response.header) {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    return h.continue;
  });

  server.route(commentRoutes);
  server.route(authRoutes);
  server.route(userRoutes);
  server.route(saveMenuRoutes);

  await server.start();
  console.log("Server running: ", server.info.uri);
};

init();
