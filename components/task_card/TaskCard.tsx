"use client";

import React from 'react';
import EditButton from "@/components/edit_button/EditButton";
import { deleteTaskAction, updateTaskAction } from "@/app/actions/tasks/task";
import DeleteButton from "@/components/delete_button/DeleteButton";

interface TaskCardProps {
    task: {
        id: string;
        title: string;
        createdAt: Date;
        status: string;
    };
    stage: {
        id: string;
        title: string;
        createdAt: Date;
    };
    project: {
        id: string;
        title: string;
        desc?: string | null;
        status: string;
        createdAt: Date;
    };
}

function TaskCard({ task, stage, project }: TaskCardProps) {
    return (
        <div className="group relative flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-sm text-gray-800 pr-16">
                {task.title} <span className="text-xs text-gray-500 ml-2">({task.status})</span>
            </p>

            <div className="absolute right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-2">
                <EditButton
                    initialTitle={task.title}
                    initialStatus={task.status}
                    action={updateTaskAction}
                    hiddenInputs={{ taskId: task.id, projectId: project.id, stageId: stage.id }}
                    buttonText="✏️"
                    modalTitle="Edit Task"
                    buttonClassName="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    statusOptions={[
                        { value: "TODO", label: "To Do" },
                        { value: "IN_PROGRESS", label: "In Progress" },
                        { value: "DONE", label: "Done" },
                    ]}
                />

                <DeleteButton
                    action={deleteTaskAction}
                    hiddenInputs={{ taskId: task.id, stageId: stage.id, projectId: project.id }}
                    buttonClassName="p-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:text-red-600 hover:border-red-300 shadow-sm transition-all"
                />
            </div>
        </div>
    );
}

export default TaskCard;