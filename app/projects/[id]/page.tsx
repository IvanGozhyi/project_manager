import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: ProjectPageProps) {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Access denied</h1>
                <p className="text-gray-500 mt-2">Please log in</p>
            </div>
        );
    }

    const project = await prisma.project.findUnique({
        where: {
            id: id,
            userId: session.user.id,
        },
        include: {
            stages: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    tasks: {
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            },
        },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                {project.desc && (
                    <p className="text-gray-600 mt-2">{project.desc}</p>
                )}
            </header>

            <div className="flex gap-6 overflow-x-auto pb-4">
                {project.stages.map((stage) => (
                    <div
                        key={stage.id}
                        className="bg-gray-100 rounded-xl p-4 min-w-[300px] flex-shrink-0"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800">{stage.title}</h3>
                        </div>

                        <div className="flex flex-col gap-3">
                            {stage.tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <p className="text-sm text-gray-800">{task.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}