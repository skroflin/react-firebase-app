import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { NavBar } from "../NavBar";
import { Card } from "primereact/card";
import { Timestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const Tracker = () => {

    const [time, setTime] = useState(0)
    const [timerOn, setTimeOn] = useState(false)
    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timerOn])

    const [newTimeDate, setNewTimeDate] = useState("");
    const [newTimeDescription, setNewTimeDescription] = useState("");
    const [newTimeTimeTracked, setNewTimeTimeTracked] = useState("");
    const timeCollectionRef = collection(db, "time");

    const onSubmitTime = async () => {
        try {
            await addDoc(timeCollectionRef, {
                date: newTimeDate,
                description: newTimeDescription,
                time_tracked: newTimeTimeTracked,
            });
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <NavBar />
            <h1>Tracker</h1>
            <div className="p-3 mx-3">
                <Card>
                    <div>
                        <span>
                            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                        </span>
                        <span>
                            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                        </span>
                        <span>
                            {("0" + ((time / 10) % 100)).slice(-2)}
                        </span>
                    </div>
                    {!timerOn && time == 0 && (
                        <Button className="px-3" onClick={() => setTimeOn(true)} label="Start" />
                    )}
                    {timerOn && (
                        <Button className="px-3" onClick={() => setTimeOn(false)} label="Stop" />
                    )}
                    {timerOn && time !== 0 && (
                        <Button className="px-3" onClick={() => setTimeOn(true)} label="Resume" />
                    )}
                    {!timerOn && time > 0 && (
                        <Button className="px-3" onClick={() => setTime(0)} label="Reset" />
                    )}
                    {!timerOn && time > 0 && (
                        <Button className="px-3" onClick={() => setNewTimeTimeTracked(time)} label="Save" />
                    )}
                    <br />
                    <Calendar className="m-3" placeholder="Date..." onChange={(e) => setNewTimeDate(String(e.target.value))} />
                    <br />
                    <InputTextarea className="m-3" placeholder="Description..." onChange={(e) => setNewTimeDescription(e.target.value)} />
                    <br />
                </Card>
                <div className="mt-3">
                    <Button onClick={onSubmitTime} label="Submit time data" />
                </div>
            </div>
        </div>
    )
}