const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports = [
  {
    method: "POST",
    path: "/register",
    handler: async (req, h) => {
      try {
        const {
          firstName,
          lastName,
          email,
          password,
          phone,
          ageRange,
          subscribeNewsletter,
          agreeTerms,
        } = req.payload;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          return h.response({ message: "Email already exists" }).code(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            ageRange: ageRange || null,
            subscribeNewsletter: !!subscribeNewsletter,
            agreeTerms: !!agreeTerms,
          },
        });

        return h.response({
          message: "User created successfully",
          id: user.id_user,
        }).code(201);
      } catch (error) {
        console.error("Register error:", error);
        return h.response({ message: "Internal Server Error" }).code(500);
      }
    },
  },
];

module.exports.push({
  method: "POST",
  path: "/login",
  handler: async (request, h) => {
    try {
      const { email, password } = request.payload;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return h.response({ message: "Invalid email or password" }).code(401);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return h.response({ message: "Invalid email or password" }).code(401);
      }

      const token = jwt.sign(
        { userId: user.id_user, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return h.response({ 
        token,
        user: {
          id_user: user.id_user,
          email: user.email,
          firstName: user.firstName
        }
       }).code(200);
    } catch (err) {
      console.error("Login error:", err);
      return h.response({ message: "Server error" }).code(500);
    }
  },
});
