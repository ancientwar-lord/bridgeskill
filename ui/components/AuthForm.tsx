'use client';

import { useAuthForm } from '@/ui/hooks/use-auth-form';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthForm() {
  const {
    isSignUp,
    setIsSignUp,
    showPassword,
    setShowPassword,
    state,
    action,
    pending,
    errors,
  } = useAuthForm();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-lg p-8 shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-center text-slate-400 mb-6">
          {isSignUp ? 'Join now' : 'Sign in to continue'}
        </p>

        {state?.message && (
          <div className="bg-rose-400/20 border border-rose-500 text-rose-400 p-4 rounded-md mb-6 text-sm">
            {state.message}
          </div>
        )}

        <form action={action} className="flex flex-col gap-5">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 bg-slate-950 border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Your name"
              />
              {errors?.name && (
                <p className="text-rose-400 text-sm mt-2">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-slate-950 border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="you@example.com"
            />
            {errors?.email && (
              <p className="text-rose-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full p-3 pr-10 bg-slate-950 border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute cursor-pointer top-1/2 right-3 text-slate-600 hover:text-slate-800"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>

            {errors?.password && (
              <div className="text-rose-400 text-sm mt-2">
                <p>Password must:</p>
                <ul className="pl-6 mt-1">
                  {errors.password.map((error: string) => (
                    <li key={error} className="list-disc">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className={`w-full py-3 rounded-md font-medium text-white transition ${
              pending
                ? 'bg-slate-500 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-500 cursor-pointer'
            } disabled:opacity-70`}
          >
            {pending ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400 text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-violet-300 hover:text-violet-200 bg-transparent border-none cursor-pointer font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
