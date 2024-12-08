"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { registerSchema } from "@/lib/validations/auth";
import { toast } from "react-toastify";
import {registerAction} from "@/actions/auth";
import  Github from "@/components/pages/Buttton/Github"


// ====================================
const Page = () => {
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(registerSchema), // zodResolver not import
        defaultValues: {
            password: "",
            email: "",
            name: "",
        },
    });

    const onSubmit = form.handleSubmit((formData) => {
        startTransition(async () => {
            const result = await registerAction(formData);
            if (result.error) {
                toast.error(result.error.message);
            } else {
                toast.success(result.message);
            }
        });
    });

    return (
        <div className="flex flex-wrap w-full max-w-screen-xl mx-auto">
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
                    <Link
                        href="/"
                        className="p-4 text-xl font-bold text-white bg-black"
                    >
                        {/*<FaArrowLeft/>*/}
                    </Link>
                </div>
                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <p className="text-3xl text-center">Create an Account</p>
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col pt-3 md:pt-8"
                    >
                        <div className="flex flex-col pt-4">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                {...form.register("name")}
                                placeholder="Name"
                                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                            />
                        </div>
                        <div className="flex flex-col pt-4">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                {...form.register("email")}
                                placeholder="Email"
                                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                            />
                        </div>
                        <div className="flex flex-col pt-4 mb-12">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                {...form.register("password")}
                                placeholder="Password"
                                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-base font-semibold text-center text-primary-dark uppercase transition duration-200 ease-in bg-primary-yellow shadow-md text-black bg-gray-300 rounded-2xl hover:text-black hover:bg-white focus:outline-none "
                            disabled={isPending}
                        >
                            <span className="w-full">Sign Up</span>
                        </button>
                    </form>
                    <div className="pt-12 pb-12 text-center">
                        <p>
                            Have an account?
                            <Link
                                href="/login"
                                className="font-semibold underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                    <div>

                        <Github/>
                    </div>
                </div>
            </div>
            <div className="w-1/2 shadow-2xl">
                {/*<Image*/}
                {/*    className="hidden object-cover w-full h-screen md:block"*/}
                {/*    src="/images/signupImg.jpg"*/}
                {/*    width={600}*/}
                {/*    height={800}*/}
                {/*/>*/}

            </div>

        </div>
    );
};

export default Page;
