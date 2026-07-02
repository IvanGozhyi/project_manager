"use client"

import React, {useState} from 'react';
import Modal from "@/components/modal/Modal";
import UniversalUpdateForm from "@/forms/update-form/form";


interface StatusOption {
    value: string;
    label: string;
}

interface UniversalEditButtonProps {
    initialTitle: string;
    action: (formData: FormData) => Promise<void>;
    hiddenInputs: Record<string, string>;
    buttonText?: React.ReactNode;
    modalTitle?: string;
    buttonClassName?: string;
    initialStatus?: string;
    statusOptions?: StatusOption[];
}

export default function EditButton({ initialTitle, action, hiddenInputs, buttonText = "Edit", modalTitle = "Edit", buttonClassName = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700", initialStatus, statusOptions }: UniversalEditButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleEditClick = (event : any) => {
        event.preventDefault();
        setIsModalOpen(true);
    }
    return (
        <div>
            <button
                onClick={handleEditClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                {buttonText}
            </button>

            <Modal isOpen={isModalOpen}
                   onClose={()=> setIsModalOpen(false)}
                   title={modalTitle}>
                <UniversalUpdateForm initialTitle={initialTitle}
                                     action={action}
                                     hiddenInputs={hiddenInputs}
                                     initialStatus={initialStatus}
                                     statusOptions={statusOptions}
                                     onClose={()=> setIsModalOpen(false)}
                                     />
            </Modal>
        </div>
    );
}

