"use client";
import React, {useState} from 'react';
import Modal from "@/components/modal/Modal";
import CreateProjectForm from "@/forms/creation-form/form";

function ProjectHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
            New Project
        </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Project"
            >
                <CreateProjectForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default ProjectHeader;