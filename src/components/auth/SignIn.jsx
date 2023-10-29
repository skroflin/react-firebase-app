import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

export const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) => {
                console.log(error)
            })
        navigate("/time-tracker")
    }
    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1>Log in into your account</h1>
                <div className="flex-1 p-3">
                    <InputText type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                </div>
                <div className="flex-1 p-3">
                    <InputText type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                </div>
                <Button className="mb-2" size="large" type="submit" label="Log in" icon="pi pi-fw pi-user"/>
            </form>
            <a href="/sign-up">Click here to create an account</a>
        </div>
    )
}