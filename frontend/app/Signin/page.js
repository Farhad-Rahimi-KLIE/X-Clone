// app/signup/page.jsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signin() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const emailOrPhone = form.elements.namedItem('emailOrPhone').value;
    const password = form.elements.namedItem('password').value;

    const formData = {
      emailOrPhone,
      password
    };

    console.log(formData);
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Phone number or email"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Not have a account ? {' '}
          <Link href="/Signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}