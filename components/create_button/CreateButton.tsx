"use client";

import React, { useState } from 'react';
import Modal from "@/components/modal/Modal";
import UniversalCreateForm from "@/forms/creation-form/form";

interface CreateButtonProps {
    initialTitle?: string;
    action: (formData: FormData) => Promise<void>;
    hiddenInputs?: Record<string, string>;
    buttonText?: React.ReactNode;
    modalTitle?: string;
    buttonClassName?: string;
    showDescription?: boolean;
    initialStatus?: string;
    statusOptions?: { value: string; label: string }[];
}

export default function CreateButton({
                                         initialTitle,
                                         action,
                                         hiddenInputs = {},
                                         buttonText = "Create",
                                         modalTitle = "Create",
                                         buttonClassName = "px-4 m-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
                                         showDescription = true
                                     }: CreateButtonProps, initialStatus?: string, statusOptions?: { value: string; label: string }[]) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className={buttonClassName}
            >
                {buttonText}
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
            >
                <UniversalCreateForm
                    action={action}
                    titleLabel={initialTitle}
                    titlePlaceholder="Enter title"
                    showDescription={showDescription}
                    hiddenInputs={hiddenInputs}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}