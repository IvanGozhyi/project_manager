import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link"
import ProjectHeader from "@/components/project_header/ProjectHeader";



export default async function ProjectPage() {
    const session = await auth();

    if(!session?.user?.id) {
        redirect("/");
    }

    const projects = await prisma.project.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });




    return (
        <div className="max-w-6xl mx-auto p-6 mt-8">
            <ProjectHeader />

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg mb-4">You don't have any projects yet.</p>
                    <span className="text-sm text-gray-400">Click the button above to get started</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full"
                        >
                            <div className="flex justify-between items-start mb-3 gap-2">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {project.title}
                                </h2>
                                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200 whitespace-nowrap">
              {project.status}
            </span>
                            </div>

                            {project.desc ? (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                    {project.desc}
                                </p>
                            ) : (
                                <p className="text-gray-400 text-sm mb-4 italic flex-grow">
                                    No description
                                </p>
                            )}

                            <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-50">
                                Created: {project.createdAt.toLocaleDateString("en-US")}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

