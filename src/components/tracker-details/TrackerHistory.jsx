import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { NavBar } from "../NavBar";
import { Button } from "primereact/button";

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
                {timeList.map((time) => (
                    <>
                        <div className="inline-block inline-block p-4 mx-4">
                            <div className="inline-block p-4 mx-4">{time.date}</div>
                            <div className="inline-block p-4 mx-4">{time.description}</div>
                            <div className="inline-block p-4 mx-4">{time.time_tracked}</div>
                            <div className="inline-block p-4 mx-4">
                                <Button label="Delete time data" onClick={() => deleteTime(time.id)}/>
                            </div>
                            <hr />
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}