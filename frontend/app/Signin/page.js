// app/signup/page.jsx
'use client';
import {useSelector, useDispatch} from 'react-redux'
import { useRouter } from 'next/navigation';
import {loginUser} from '../../lib/features/authentecation/authSlice'
import Link from 'next/link';
import { useState } from 'react';

export default function Signin() {
  const dispatch = useDispatch()
  const router = useRouter();

  const [input, setInput] = useState({
    email : "",
    password : ""
  })
   const HandleSubmit = (e)=>{
          e.preventDefault();
          dispatch(loginUser(input))
          router.push('/');
        }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8 ml-11">Go to your Account</h1>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
              placeholder="Enter Your email"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
              placeholder="Enter Your Password"
              className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            onClick={HandleSubmit}
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