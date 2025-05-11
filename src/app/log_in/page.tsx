'use client';
import { useState } from "react";
import AuthFormLogin from "./AuthFormLogin";
import AuthFormRegister from "./AuthFormRegister";


export default function LogIn() {
  
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div>
      <AuthFormLogin/>
    </div>
    
  );
}
