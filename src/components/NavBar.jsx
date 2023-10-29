import React from "react";
import { AuthDetails } from "./auth/AuthDetails";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="home-container top-auto">
            <nav className="pb-10 m-10">
                <div className="inline-block p-4 mx-4">
                    <Button onClick={() => navigate("/time-tracker/tracker")} label="Tracker" icon="pi pi-fw pi-clock"/>
                </div>
                <div className="inline-block p-4 mx-4">
                    <Button onClick={() => navigate("/time-tracker/history")} label="History" icon="pi pi-fw pi-book"/>
                </div>
                <div className="inline-block p-4 mx-4">
                    <Button onClick={() => navigate("/time-tracker/")} label="Home" icon="pi pi-fw pi-home"/>
                </div>
                <div className="inline-block">
                    <AuthDetails />
                </div>
            </nav>
            <hr />
        </div>
    )
}