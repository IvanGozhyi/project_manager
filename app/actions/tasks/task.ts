"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const stageId = formData.get("stageId") as string;
    const title = formData.get("title") as string;

    if (!stageId || !title) return;

    const existingTasksCount = await prisma.task.count({
        where: { stageId }
    });

    await prisma.task.create({
        data: {
            title,
            stageId,
            order: existingTasksCount,
        },
    });

    revalidatePath(`/projects/${formData.get("projectId")}`);
}

export async function updateTaskAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const taskId = formData.get("taskId") as string;
    const title = formData.get("title") as string;
    const status = formData.get("status") as string | null;

    const toUpdate: Record<string, string> = {};

    if (title) toUpdate.title = title;
    if (status) toUpdate.status = status;

    if (!taskId || !title) return;

    await prisma.task.update({
        where: { id: taskId },
        data: toUpdate,
    });

    revalidatePath(`/projects/${formData.get("projectId")}`);
}

export async function deleteTaskAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const taskId = formData.get("taskId") as string;

    if (!taskId) return;

    await prisma.task.delete({
        where: { id: taskId },
    });

    revalidatePath(`/projects/${formData.get("projectId")}`);
}