const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = [
    {
        method: 'GET',
        path: '/users',
        handler: async (req, h) => {
            try {
                const user = await prisma.user.findMany({
                    select: {
                        id_user: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        ageRange: true
                    }
                });
                return h.response({user}).code(200);
            }catch (err) {
                console.error('Error fetching user', err)
                return h.response({ message: 'Server error', error: err.message}).code(500);
            }
        }
    }
]