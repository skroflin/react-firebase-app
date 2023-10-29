import { useEffect, useState } from "react";
import React from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })
    }, [])

    const navigate = useNavigate()

    const userSignOut = async () => {
        try{
        await signOut(auth)
        localStorage.clear()
        navigate("/")
        }catch(err){
            console.error(e)
        }
    }

    return(
        <div>
            { authUser? <><p>{`Signed in as ${authUser.email}`}</p><Button size="large" onClick={userSignOut} label="Sign out"/></> : <p>Signed Out</p> }
        </div>
    )
}