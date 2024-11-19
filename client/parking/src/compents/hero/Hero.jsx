import React, { useState } from 'react';
import './hero.css';
import axios from 'axios';

function RegistrationForm() {
    const [record, setRecord] = useState({
        vehicleNo: '',
        vehicleType: '',
        name: '',
        parkingSlot: ''
    });

    const changeValue = (e) => {
        setRecord({
            ...record,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();  
        const url = 'https://parking-vehicle-zbdl.vercel.app/?vercelToolbarCode=KYWhcVLbmr7nfsQ/api/parkIn'; 

        axios.post(url, record)
            .then((res) => {
                console.log(res.data);
                alert('Vehicle parked successfully');
                setRecord({
                    vehicleNo: '',
                    vehicleType: '',
                    name: '',
                    parkingSlot: ''
                }); 
            })
            .catch((err) => {
                console.error(err);
                alert('Slot is Boked');
            });
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="vehicle-number">Vehicle Number</label>
                <input 
                    type="text" 
                    id="vehicle-number" 
                    name="vehicleNo" 
                    value={record.vehicleNo}
                    onChange={changeValue} 
                    required
                /><br /><br />
                
                <label htmlFor="vehicle-type">Vehicle Type</label>
                <input 
                    type="text" 
                    id="vehicle-type" 
                    name="vehicleType" 
                    value={record.vehicleType}
                    onChange={changeValue} 
                    required 
                /><br /><br />
                
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={record.name}
                    onChange={changeValue} 
                    required
                /><br /><br />
                
                <label htmlFor="slot-no">Slot No</label>
                <input 
                    type="text" 
                    id="slot-no" 
                    name="parkingSlot" 
                    value={record.parkingSlot}
                    onChange={changeValue} 
                    required
                /><br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
