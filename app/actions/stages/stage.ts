"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createStageAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const projectId = formData.get("projectId") as string;
    const title = formData.get("title") as string;

    if (!projectId || !title){
        throw new Error(`Invalid ${projectId}, title: ${title}`)
    }

    const existingStageCount = await prisma.stage.count({
        where: { projectId: projectId }
    });

    await prisma.stage.create({
        data: {
            title,
            projectId,
            order: existingStageCount,
        },
    });

    revalidatePath(`/projects/${projectId}`);
}

export async function updateStageAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const stageId = formData.get("stageId") as string;
    const title = formData.get("title") as string;
    const status = formData.get("status") as string | null;

    const toUpdate: Record<string, string> = {};

    if (title) toUpdate.title = title;
    if (status) toUpdate.status = status;


    if (!stageId || !title) return;

    await prisma.stage.update({
        where: { id: stageId },
        data: toUpdate,
    });

    revalidatePath(`/projects/${formData.get("projectId")}`);
}

export async function deleteStageAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const stageId = formData.get("stageId") as string;

    if (!stageId) return;

    await prisma.stage.delete({
        where: { id: stageId },
    });

    revalidatePath(`/projects/${formData.get("projectId")}`);
}