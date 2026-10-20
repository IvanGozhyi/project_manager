interface TaskModalProps {
    task: {
        id: string;
        title: string;
        createdAt: Date;
        status: string;
        description?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
    if (!isOpen) {
        return null;
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {task.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>

                <div className="text-gray-600 dark:text-gray-300">
                    {task.description ? (
                        <p className="whitespace-pre-wrap">{task.description}</p>
                    ) : (
                        <p className="italic text-gray-400">No description</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskModal;