import {prisma} from "@/lib/prisma";

const bcrypt = require('bcrypt');


export const getUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({where: {email}});
    } catch {
        return null;
    }
};



export const createUser = async (email, name, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });
}


export const getAuthUser = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    } catch {
        return null;
    }
};


export const getUserById = async (id) => {
    try {
        return await prisma.user.findUnique({where: {id}})
    } catch {
        return null
    }
}

