"use client";
import React from 'react';
import {useFormStatus} from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
            {pending ? "Creating..." : "Create Project"}
        </button>
    );
}

export default SubmitButton;