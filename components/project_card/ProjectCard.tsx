import React from 'react';
import Link from "next/link";
import EditButton from "@/components/edit_button/EditButton";
import DeleteButton from "../delete_button/DeleteButton";
import { deleteProjectAction, updateProjectAction } from "@/app/actions/projects/projects";

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        desc?: string | null;
        status: string;
        createdAt: Date;
    };
}

function ProjectCard({ project }: ProjectCardProps) {
    return (

        <div className="group relative flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all h-full">


            <div className="absolute top-5 right-5 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <EditButton
                    initialTitle={project.title}
                    action={updateProjectAction}
                    hiddenInputs={{ projectId: project.id }}
                    buttonText="✏️"
                    modalTitle="Edit Project"
                    buttonClassName="p-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all"
                    statusOptions={[
                        { value: "TODO", label: "To Do" },
                        { value: "IN_PROGRESS", label: "In Progress" },
                        { value: "DONE", label: "Done" },
                    ]}
                />
                <DeleteButton
                    action={deleteProjectAction}
                    hiddenInputs={{ projectId: project.id }}
                    icon="🗑️"
                    buttonClassName="p-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:text-red-600 hover:border-red-300 shadow-sm transition-all"
                />
            </div>


            <Link
                href={`/projects/${project.id}`}
                className="flex flex-col p-6 h-full cursor-pointer"
            >
                <div className="flex justify-between items-start mb-3 gap-2 pr-20">
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
        </div>
    );
}

export default ProjectCard;