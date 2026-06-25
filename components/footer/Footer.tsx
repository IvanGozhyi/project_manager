"use client";

function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-auto">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">About</h2>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto md:mx-0">
                        This is a project management application built with Next.js and TypeScript.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
                    <p className="text-sm text-gray-600">Email: <a href="mailto:exmpl123@exp.com" className="hover:text-blue-600">exmpl123@exp.com</a></p>
                    <p className="text-sm text-gray-600">Phone: +1 (123) 456-7890</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;