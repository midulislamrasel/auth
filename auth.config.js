import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";
import { getUserByEmail } from "@/lib/auth";
import Google from "next-auth/providers/google"


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),

        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),


    ],
    callbacks: {
            async singIn({ account, profile, error }) {
                console.error("Error:", error);
                if (account.provider === "google") {
                    return true; // Allow sign-in
                }
                return false; // Deny sign-in
            },
    },

    pages: {
        signIn: "/login",
        error: "/error",
    },
};
