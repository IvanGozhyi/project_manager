"use client";

import { useRef } from "react";
import SubmitButton from "@/components/submit/SubmitButton";

interface UniversalCreateFormProps {
    action: (formData: FormData) => Promise<void>;
    hiddenInputs?: Record<string, string>;
    titleLabel?: string;
    titlePlaceholder?: string;
    showDescription?: boolean;
    onClose?: () => void;
}

export default function UniversalCreateForm({
                                                action,
                                                hiddenInputs = {},
                                                titleLabel = "Project Title",
                                                titlePlaceholder = "",
                                                showDescription = true,
                                                onClose
                                            }: UniversalCreateFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleAction = async (formData: FormData) => {
        try {
            await action(formData);
            formRef.current?.reset();
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
                    {titleLabel} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder={titlePlaceholder}
                    required
                    autoFocus
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 text-black"
                />
            </div>

            {showDescription && (
                <div>
                    <label htmlFor="desc" className="block text-sm font-semibold text-gray-800 mb-1.5">
                        Description <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                        id="desc"
                        name="desc"
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none disabled:opacity-50 text-black"
                    />
                </div>
            )}

            <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-gray-100">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                )}
                <SubmitButton />
            </div>
        </form>
    );
}