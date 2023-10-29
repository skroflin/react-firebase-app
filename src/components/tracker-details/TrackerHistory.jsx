import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { NavBar } from "../NavBar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import 'primeicons/primeicons.css';

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
                            <div className="inline-block inline-block" key={idx}>
                                <ol>
                                    <li>
                                        <div className="inline-block p-1 text-left">{time.date.toString()}</div>
                                    </li>
                                    <li>
                                        <div className="inline-block p-1 text-left">Description: {time.description}</div>
                                    </li>
                                    <li>
                                        <div className="inline-block p-1 text-left">Time tracked: {time.time_tracked.toLocaleString()}</div>
                                    </li>
                                    <li>
                                        <div className="inline-block p-1">
                                            <Button label="Delete time data" onClick={() => deleteTime(time.id)} icon="pi pi-fw pi-trash"/>
                                        </div>
                                    </li>
                                </ol>
                                <hr className="px-10"/>
                            </div>
                        </>
                    ))}
                </Card>
            </div>
        </div>
    )
}