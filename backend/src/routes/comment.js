const { PrismaClient } = require('@prisma/client');
const { sendEmail } = require('../utils/email');
const prisma = new PrismaClient();

module.exports = [
    {
        method: 'GET',
        path: '/comments',
        handler: async () => {
            return await prisma.comment.findMany({
                orderBy: { id_comment: 'desc'}
            });
        }
    },

    {
        method: 'GET',
        path: '/comments/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const comment = await prisma.comment.findUnique({
                where: { id_comment: id}
            });
            if (!comment) {
                return h.response({message: 'Not Found'}).code(404);
            }
            return comment;
        }
    },

    {
        method: 'POST',
        path: '/comments',
        handler: async (request, h) => {
            try {
                const { nama, email_comment, pesan} = request.payload;
                const newComment = await prisma.comment.create({
                    data: { nama, email_comment, pesan}
                });
    
                await sendEmail({
                    nama,
                    email_comment,
                    pesan
                })
    
                return h.response({message: 'Pesan Berhasi di kirim', data: newComment}).code(201);
            } catch (error) {
                return h.response({ message: 'Terjadi kesalahan', error: err.message }).code(500);
            }
        }
    }
]