"use server";
import {loginSchema, registerSchema} from "@/lib/validations/auth";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
 import { AuthError } from "next-auth";
import {createUser, getUserByEmail} from "@/lib/auth";
import {signOut} from "../../../auth";

// =========Register Action==================
export default async function registerAction(formData, redirect = true) {
    const validatedFields = registerSchema.safeParse({
        email: formData.email,
        password: formData.password,
        name: formData.name,
    });

    if(!validatedFields.success){
        return {error:"invalid fields !"}
    }
    const {email,password,name}=validatedFields.data

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error:"user already exists"};
    }

    await createUser(email, name, password);
    try{
        await signIn("credentials",{
            email,
            password,
            redirect,
            redirectTo: '/profile',
        });
        revalidatePath("/profile");
    }catch (error){
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {error:"invalid credentials"};
                default:
                    return {error:"Something went wrong!" }
            }
        }
       throw error;
    }
}



// ===================login Action=============
export async function loginAction(formData, redirect = true) {
    const validatedFields = loginSchema.safeParse({
        email: formData.email,
        password: formData.password,
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: redirect,
            redirectTo: "/profile",
        });
        revalidatePath("/profile");
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
}


// ====================  LogOut Action  ========================
export async function LogOutAction() {
    await signOut({redirectTo:"/login"});
    revalidatePath("/");
}