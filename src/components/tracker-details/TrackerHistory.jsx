import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { NavBar } from "../NavBar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export const TrackerHistory = () => {
    const [timeList, setTimeList] = useState([]);
    const timeCollectionRef = collection(db, "time");
    useEffect(() => {
        const getTimeList = async () => {
            try {
                const data = await getDocs(timeCollectionRef)
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
                console.log(filteredData);
                setTimeList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        getTimeList();
    }, []);

    const deleteTime = async (id) => {
        const timeDoc = doc(db, "time", id)
        await deleteDoc(timeDoc);
    }

    return (
        <div>
            <NavBar />
            <div>
                <h1>
                    Tracker History
                </h1>
                <Card>
                {timeList.map((time, idx) => (
                    <>
                        <div className="inline-block inline-block p-4 mx-4" key={idx}>
                            <div className="inline-block p-1">{time.date.toString()}</div>
                            <div className="inline-block p-1">{time.description}</div>
                            <div className="inline-block p-1">{time.time_tracked.toLocaleString()}</div>
                            <div className="inline-block p-1">
                                <Button label="Delete time data" onClick={() => deleteTime(time.id)}/>
                            </div>
                            <hr />
                        </div>
                    </>
                ))}
                </Card>
            </div>
        </div>
    )
}