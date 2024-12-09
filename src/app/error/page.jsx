'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-red-600 text-3xl font-bold">Root error: {error?.message}</p>
            <p className="text-lg text-gray-700 mb-6">
                {error?.message || "An unexpected error occurred."}
            </p>

            <div className="space-x-4">

                <button
                    onClick={reset}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Try Again
                </button>
                <a
                    href="/"
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}
