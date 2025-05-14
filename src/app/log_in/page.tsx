'use client';
import { useState } from "react";
import AuthFormLogin from "./AuthFormLogin";
import AuthFormRegister from "./AuthFormRegister";


export default function LogIn() {
  
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 justify-start">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-[#E50609] mt-20" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
        {isLogin ? <AuthFormLogin/> : <AuthFormRegister/>}
        <div className="mt-6 text-center">
          {isLogin ? (
            <span className="text-gray-700 text-base">Don&apos;t have an account?{' '}
            <button
                className="text-[#E50609] font-bold hover:underline hover:text-black transition-all duration-150"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </span>
          ) : (
            <span className="text-gray-700 text-base">Already have an account?{' '}
              <button
                className="text-[#E50609] font-bold hover:underline hover:text-black transition-all duration-150"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
