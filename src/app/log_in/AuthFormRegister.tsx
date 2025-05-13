import { useState } from "react";
// import { FiMail, FiLock } from 'react-icons/fi';
import SocialButtons from './SocialButtons';

function AuthFormRegister() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        console.log(email,password,confirmPassword)
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    }
    

    return(
        <div className="w-full">
            <SocialButtons />
            <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight" style={{ color: '#E50609' }}>Register</h2>
            <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-2 text-gray-400 text-sm font-semibold uppercase tracking-wider">ou</span>
                <div className="flex-grow h-px bg-gray-200" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">@</div>
                    <input 
                    type="email" 
                    placeholder="Your email" 
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E50609] bg-gray-50 font-sans text-base shadow-sm transition text-gray-900 placeholder-gray-400"
                    />
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">*</div>
                    <input 
                    type="password" 
                    placeholder="Your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E50609] bg-gray-50 font-sans text-base shadow-sm transition text-gray-900 placeholder-gray-400"
                    />
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">*</div>
                    <input 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E50609] bg-gray-50 font-sans text-base shadow-sm transition text-gray-900 placeholder-gray-400"
                    />
                </div>
                <button 
                type="submit"
                className="w-full py-3 mt-2 rounded-xl text-white font-bold text-lg shadow-md tracking-wide transition-all duration-300 ease-in-out bg-red-600 hover:bg-red-800 active:bg-red-900 active:scale-95"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default AuthFormRegister;