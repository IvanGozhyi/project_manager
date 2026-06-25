"use client";

import LoginButton from "@/components/login_button/LoginButton";
import SignOutButton from "@/components/sign_out_button/SignOutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Navigation() {
    const { data: session, status } = useSession();

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center gap-8">
                <Link className="text-xl font-bold text-gray-900 tracking-wide hover:text-blue-600 transition-colors" href="/">
                    Main
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="/projects">
                    Projects
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {status === "loading" && (
                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                )}

                {status === "authenticated" && session && (
                    <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                            {session.user?.name || session.user?.email}
                        </span>
                        <SignOutButton/>
                    </div>
                )}

                {status === "unauthenticated" && (
                    <LoginButton/>
                )}
            </div>
        </nav>
    );
}

export default Navigation;