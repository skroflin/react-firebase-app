import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

export const SignUp = () => {
    const navigate = useNavigate()
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        }).catch((error) => {
            console.log(error)
        })
        navigate("/");
    }
    return (
        <div className="sign-up-container">
            <form onSubmit={signUp}>
                <h1>Create an account</h1>
                <div className="flex-1 p-3">
                    <InputText type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                </div>
                <div className="flex-1 p-3">
                    <InputText type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                </div>
                <Button className="mb-2" size="large" type="submit" label="Create your account" icon="pi pi-fw pi-user-plus"/>
            </form>
            <a href="/">Already have an account? Click here</a>
        </div>
    )
}