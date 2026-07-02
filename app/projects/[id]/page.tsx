import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import EditButton from "@/components/edit_button/EditButton";
import {createStageAction, deleteStageAction, updateStageAction} from "@/app/actions/stages/stage";
import CreateButton from "@/components/create_button/CreateButton";
import {createTaskAction, deleteTaskAction, updateTaskAction} from "@/app/actions/tasks/task";
import DeleteButton from "@/components/delete_button/DeleteButton";
import TaskCard from "@/components/task_card/TaskCard";


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
                                <TaskCard task={task} stage={stage} project={project} />
                            ))}
                        </div>

                        <CreateButton
                            initialTitle=""
                            action={createTaskAction}
                            hiddenInputs={{ projectId: project.id, stageId: stage.id }}
                            buttonText="Add New Task"
                            modalTitle="Create New Task"
                            buttonClassName="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            initialStatus="todo"
                        />

                        <EditButton
                            initialTitle={stage.title}
                            action={updateStageAction}
                            hiddenInputs={{ stageId: stage.id, projectId: project.id }}
                            buttonText="Edit Stage"
                            modalTitle="Edit Stage"
                            buttonClassName="text-gray-500 hover:text-gray-900 text-sm font-medium"
                        />
                        <DeleteButton
                            action={deleteStageAction}
                            hiddenInputs={{stageId: stage.id, projectId: project.id}}
                            buttonClassName="p-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:text-red-600 hover:border-red-300 shadow-sm transition-all"
                        />
                    </div>
                ))}
            </div>
            <CreateButton
                initialTitle=""
                action={createStageAction}
                hiddenInputs={{ projectId: project.id }}
                buttonText="Add New Stage"
                modalTitle="Create New Stage"
                buttonClassName="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            />
        </div>
    );
}