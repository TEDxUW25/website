import { useState } from "react";

function AuthFormLogin(){


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
        }

    return(
        <div >
            <form onSubmit={handleSubmit}>
           
                <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> 
                <button
                type="submit">
                    Log In
                 </button>
            </form>
        </div>
    )
}

export default AuthFormLogin;