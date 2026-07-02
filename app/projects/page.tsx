import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { createProjectAction } from "@/app/actions/projects/projects";
import CreateButton from "@/components/create_button/CreateButton";
import ProjectCard from "@/components/project_card/ProjectCard";

export default async function ProjectPage() {
    const session = await auth();

    if (!session?.user?.id) {
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
            <CreateButton
                initialTitle=""
                action={createProjectAction}
                buttonText="Create New Project"
                modalTitle="Create New Project"
            />

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg mb-4">You don't have any projects yet.</p>
                    <span className="text-sm text-gray-400">Click the button above to get started</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}