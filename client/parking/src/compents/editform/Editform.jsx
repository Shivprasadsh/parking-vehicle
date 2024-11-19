import React, { useState, useEffect, useRef } from 'react';
import './edit.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const vehicleNoRef = useRef(null);
    const vehicleTypeRef = useRef(null);
    const nameRef = useRef(null);
    const parkingSlotRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://parking-vehicle-zbdl.vercel.app/?vercelToolbarCode=KYWhcVLbmr7nfsQ/api/details/${id}`;
                const response = await axios.get(url);
                
                if (response.data) {
                    vehicleNoRef.current.value = response.data.vehicleNo;
                    vehicleTypeRef.current.value = response.data.vehicleType;
                    nameRef.current.value = response.data.name;
                    parkingSlotRef.current.value = response.data.parkingSlot;
                }
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
                alert('Failed to fetch vehicle data.');
            }
        };

        fetchData();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedVehicle = {
            vehicleNo: vehicleNoRef.current.value,
            vehicleType: vehicleTypeRef.current.value,
            name: nameRef.current.value,
            parkingSlot: parkingSlotRef.current.value,
        };

        const url = `https://parking-vehicle-zbdl.vercel.app/?vercelToolbarCode=KYWhcVLbmr7nfsQ/api/update/${id}`;

        try {
            const response = await axios.put(url, updatedVehicle);  // Use updatedVehicle here
            console.log(response.data);
            alert('Vehicle updated successfully');
            navigate('/summary');
        } catch (err) {
            console.error(err);
            alert('Error while updating the vehicle');
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="vehicle-number">Vehicle Number</label>
                <input
                    type="text"
                    id="vehicle-number"
                    name="vehicleNo"
                    ref={vehicleNoRef}
                    required
                /><br /><br />

                <label htmlFor="vehicle-type">Vehicle Type</label>
                <input
                    type="text"
                    id="vehicle-type"
                    name="vehicleType"
                    ref={vehicleTypeRef}
                    required
                /><br /><br />

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    ref={nameRef}
                    required
                /><br /><br />

                <label htmlFor="slot-no">Slot No</label>
                <input
                    type="text"
                    id="slot-no"
                    name="parkingSlot"
                    ref={parkingSlotRef}
                    required
                /><br /><br />

                <button type="submit">Update Vehicle</button>
            </form>
        </div>
    );
}

export default EditForm;
