"use client"
import React, {useTransition} from 'react';

interface DeleteButtonProps {
    action: (formData: FormData) => Promise<void>;
    hiddenInputs: Record<string, string>;
    icon?: React.ReactNode;
    buttonClassName?: string;
}
function DeleteButton({action, hiddenInputs, icon = "🗑️",buttonClassName}: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            await action(formData);
        });
    };
    return (
        <div>
            <form onSubmit={handleDelete} className="inline">
                {Object.entries(hiddenInputs).map(([name, value]) => (
                    <input key={name} type="hidden" name={name} value={value} />
                ))}
                <button
                    className={buttonClassName}
                    type="submit"
                    disabled={isPending}
                >
                    {icon}
                </button>
            </form>
        </div>
    );
}

export default DeleteButton;