"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createProjectAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;

    if (!title) return;

    await prisma.project.create({
        data: {
            title,
            desc: desc || null,
            userId: session.user.id,
        },
    });

    revalidatePath("/projects");
}

export async function updateProjectAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const projectId = formData.get("projectId") as string;
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const status = formData.get("status") as string | null;

    const dataToUpdate: Record<string, string> = {};

    if (!projectId || !title) return;
    if (title) dataToUpdate.title = title;
    if (desc) dataToUpdate.desc = desc;
    if (status) dataToUpdate.status = status;

    await prisma.project.update({
        where: { id: projectId },
        data: dataToUpdate,
    });

    revalidatePath("/projects");
}

export async function deleteProjectAction(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const projectId = formData.get("projectId") as string;

    if (!projectId) return;

    await prisma.project.delete({
        where: { id: projectId },
    });

    revalidatePath("/projects");
}