
import {auth} from "../../../../auth";
import {getAuthUser} from "@/lib/auth";
import {FaCalendarAlt, FaGift} from "react-icons/fa";
import Link from "next/link";
import {redirect} from "next/navigation";
import Logout from "@/components/pages/Buttton/Logout";

const Customer = async () => {
    try {
        const session = await auth();
        if (!session || !session.user) {
            redirect("/login");
        }
        const { email } = session.user;
        const user = await getAuthUser(email);
        if (!user) {
            redirect("/not-found");
        }
        return (
            <div className="min-h-screen w-[80vw] bg-gray-100 p-4 md:p-6 lg:p-8">
                <main className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
                    <h1 className="mb-8 text-center text-3xl font-semibold text-gray-600 md:text-4xl lg:text-5xl">
                        Hi {user.name || "John Doe"}!
                    </h1>

                    <div className="mt-10 text-center text-white">
                        <Logout/>
                    </div>
                </main>
            </div>
        );
    } catch (error) {
        console.error("Error in Customer component:", error);
        redirect("/login");
    }

};

export default Customer;
