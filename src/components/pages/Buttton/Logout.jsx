"use client"
import React, {useTransition} from 'react';
import {LogOutIcon} from "lucide-react";
import {logoutAction} from "@/actions/auth";
import {useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import { toast } from "sonner";

const Logout = () => {
    const [isPending,startTransition] = useTransition();
    const form = useForm();
    const { update } = useSession();

    const onSubmit = form.handleSubmit(()=>{
        startTransition(async ()=>{
            const result = await logoutAction ()
            if (result?.error) {
                toast.error(result.error);
            } else {
                await update();
                toast.success("Account logout successfully!");
            }
        })
    })
    return (
        <div>
            <form onSubmit={onSubmit}>
                <button
                    disabled={isPending}
                    type="submit"
                    className=" w-52 flex bg-green-500 items-center gap-2 p-2 text-sm  font-medium text-gray-500 rounded-lg  hover:text-gray-700"
                >
                    <LogOutIcon className="w-6 text-white  h-7 mr-2"/>
                   <span className="text-white text-2xl">Log out</span>
                </button>
            </form>
        </div>
    );
};

export default Logout;