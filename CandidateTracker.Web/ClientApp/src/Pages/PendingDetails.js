import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Context } from '../Context';

const PendingDetails = () => {

    const ctx = useContext(Context);

    const params = useParams();
    const { id } = params;
    const [Candidate, SetCandidate] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', status: '', notes: '' });

    useEffect(() => {
        const getDetails = async () => {
            const { data } = await axios.get(`/api/candidates/getcandidateforid?id=${id}`)
            SetCandidate(data);
        }
        getDetails();
    }, [Candidate]);

    const onConfirmClick = async() => {
        await axios.post(`/api/candidates/confirm?id=${id}`);
        ctx.updateCounts();
    };

    const onRefuseClick = async () => {
        await axios.post(`/api/candidates/refuse?id=${id}`);
        ctx.updateCounts();
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h4>Name: {Candidate.firstName} {Candidate.lastName}</h4>
                    <h4>Email: {Candidate.email}</h4>
                    <h4>Phone: {Candidate.phoneNumber}</h4>
                    <h4>Status: {Candidate.status}</h4>
                    <h4>Notes: {Candidate.notes}</h4>
                    <p></p>

                    {Candidate.status === 'Pending' && <div>
                        <button className="btn btn-primary" onClick={onConfirmClick}>
                            Confirm
                        </button>
                        <button className="btn btn-danger" onClick={onRefuseClick}>
                            Refuse
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default PendingDetails;