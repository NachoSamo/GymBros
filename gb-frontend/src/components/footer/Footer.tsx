import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-900">
                    © {currentYear} Ignacio Samocachan | Ingeniero en Sistemas - UTN FRC. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};
