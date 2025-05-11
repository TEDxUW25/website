import { useState } from "react";



function AuthFormRegister(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        console.log(email,password,confirmPassword)
    }
    



    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default AuthFormRegister;