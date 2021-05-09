import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const Context = createContext();

const ContextComponent = ({ children }) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [refusedCount, setRefusedCount] = useState(0);

    // const updatePending = async () => {
    //     const pending = await axios.get('/api/candidates/getpendingcount');
    //     setPendingCount(pending.data);
    // }

    // const updateConfirmed = async () => {
    //     const { data } = await axios.get('/api/candidates/getconfirmedcount');
    //     setConfirmedCount(data);
    // }

    // const updateRefused = async () => {
    //     const { data } = await axios.get('/api/candidates/getrefusedcount');
    //     setRefusedCount(data);
    // }

    const updateCounts = async () => {
        const pending = await axios.get('/api/candidates/getpendingcount');
        setPendingCount(pending.data);
        const confirmed = await axios.get('/api/candidates/getconfirmedcount');
        setConfirmedCount(confirmed.data);
        const refused = await axios.get('/api/candidates/getrefusedcount');
        setRefusedCount(refused.data);
    }

    useEffect(() => {
        updateCounts();
    }, []);

    return (
        <Context.Provider value={{ pendingCount, refusedCount, confirmedCount, updateCounts }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextComponent };