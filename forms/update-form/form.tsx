"use client";

import { useRef } from "react";
import SubmitButton from "@/components/submit/SubmitButton";

interface StatusOption {
    value: string;
    label: string;
}

interface UniversalEditFormProps {
    initialTitle: string;
    action: (formData: FormData) => Promise<void>;
    hiddenInputs?: Record<string, string>;
    onClose?: () => void;
    initialStatus?: string;
    statusOptions?: StatusOption[];
}

export default function Form({
                                              initialTitle,
                                              action,
                                              hiddenInputs = {},
                                              onClose,
                                              initialStatus,
                                              statusOptions
                                          }: UniversalEditFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleAction = async (formData: FormData) => {
        try {
            await action(formData);
            if (onClose) onClose();
        } catch (error) {
            console.error("Failed to execute action:", error);
        }
    };

    return (
        <form ref={formRef} action={handleAction} className="flex flex-col gap-5">
            {Object.entries(hiddenInputs).map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
            ))}

            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={initialTitle}
                    required
                    autoFocus
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black"
                />
            </div>

            {statusOptions && statusOptions.length > 0 && (
                <div>
                    <label htmlFor="status" className="block text-sm font-semibold text-gray-800 mb-1.5">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        defaultValue={initialStatus}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-gray-100">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <SubmitButton />
            </div>
        </form>
    );
}