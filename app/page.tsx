import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                Welcome to the <span className="text-blue-600">Project Management</span> Application
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-2xl">
                This application allows you to manage your projects efficiently.
            </p>

            <p className="text-md text-gray-500 mb-8">
                Let's start making projects and making tasks
            </p>

            <Link
                href="/projects"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
            >
                View Projects
            </Link>
        </div>
    );
}