'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'

export default function Signup() {
  const dispatch = useDispatch()
  const router = useRouter();

  const [input, setInput] = useState({
    username : "",
    email : "",
    password : ""
  })

  const HandleSubmit = (e)=>{
    e.preventDefault();
    dispatch(registerUser(input))
    router.push('/Signin');
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8 ml-11">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name='username'
              value={input.username}
              onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
              placeholder="Name"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              maxLength={50}
              required
            />
          </div>

          <div>
            <input
              type="text"
              name='email'
              value={input.email}
               onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
              placeholder="Phone number or email"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name='password'
              value={input.password}
              onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
              placeholder="Password"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            nClick={HandleSubmit}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <Link href="/Signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}