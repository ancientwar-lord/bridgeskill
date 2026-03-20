'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for debugging.
    console.error('🚨 Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-rose-400 mb-3">
          Something went wrong
        </h2>
        <p className="text-slate-400 mb-6">We are sorry, please try again.</p>

        <button
          onClick={reset}
          className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-md font-medium"
        >
          Try Again
        </button>

        <p className="mt-6 text-xs text-slate-500">Error ID: {error.digest}</p>
      </div>
    </div>
  );
}
