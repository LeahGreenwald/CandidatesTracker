import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Refused = () => {

    const [Refused, SetRefused] = useState([]);
    const [ShowNotes, SetShowNotes] = useState(true);

    useEffect(() => {
        const getRefused = async () => {
            const { data } = await axios.get('/api/candidates/getRefused');
            SetRefused(data);
        };
        getRefused();
    }, []);

    const tableRow = c => {
        return (
            <tr key={c.id}>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.phoneNumber}</td>
                <td>{c.email}</td>
                {ShowNotes && <td>{c.notes}</td>}
            </tr>
        );
    }

    const toggleNotes = () => {
        SetShowNotes(!ShowNotes);
    }

    return (
        <div className="container">
            <div>
                <h1>Refused</h1>
                <div>
                    <button className="btn btn-success" onClick={toggleNotes}>Toggle Notes</button>
                    <table className="table table-hover table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                {ShowNotes && <th>Notes</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {Refused.map(c => tableRow(c))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Refused;