
import {auth} from "../../../../auth";
import {getAuthUser} from "@/lib/auth";
import {FaCalendarAlt, FaGift} from "react-icons/fa";
import Link from "next/link";
import {redirect} from "next/navigation";

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

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Book Now Card */}
                        <Link
                            href="/public"
                            className="group flex flex-col items-center rounded-lg bg-teal-500 p-6 text-white transition-transform hover:scale-105"
                        >
                            <FaCalendarAlt className="mb-4 h-12 w-12" />
                            <h2 className="mb-2 text-xl font-bold md:text-2xl">
                                Book Now
                            </h2>
                            <p className="text-center text-sm text-teal-50">
                                Schedule a Booking for your next service
                            </p>
                        </Link>

                        {/* Gift Cards Card */}
                        <Link
                            href="/public"
                            className="group flex flex-col items-center rounded-lg bg-coral-500 p-6 text-white transition-transform hover:scale-105"
                            style={{ backgroundColor: "#ff6f61" }}
                        >
                            <FaGift className="mb-4 h-12 w-12" />
                            <h2 className="mb-2 text-xl font-bold md:text-2xl">
                                Buy Gift Cards
                            </h2>
                            <p className="text-center text-sm text-coral-50">
                                Buy a Gift Card towards any service
                            </p>
                        </Link>
                    </div>
                    {/* <ABED /> */}
                    <footer className="mt-8 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Cleaning Express
                    </footer>
                </main>
            </div>
        );
    } catch (error) {
        console.error("Error in Customer component:", error);
        redirect("/login");
    }
};

export default Customer;
