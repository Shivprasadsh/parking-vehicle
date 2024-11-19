import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // for navigation to the update page
import './summary.css';

const SummaryParking = () => {
  const [record, setRecord] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch vehicle data from the backend on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://parking-vehicle-ujes.vercel.app/?vercelToolbarCode=Z8ZXdQSnX_vwUfo/api/summary');
        setRecord(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle vehicle removal
  const removeVehicle = async (vehicleNo, parkingSlot) => {
    try {
      const response = await axios.post('https://parking-vehicle-ujes.vercel.app/?vercelToolbarCode=Z8ZXdQSnX_vwUfo/api/removeVehicle', {
        vehicleNo,
        parkingSlot
      });

      if (response.status === 200) {
        alert(response.data.message);
        setRecord((prevRecord) => prevRecord.filter(item => item.vehicleNo !== vehicleNo));
      }
    } catch (error) {
      console.error("Error removing vehicle:", error);
      alert("Error removing vehicle.");
    }
  };

  // Handle vehicle check-in
  const checkInVehicle = async (vehicleNo, parkingSlot) => {
    try {
      const response = await axios.post('https://parking-vehicle-ujes.vercel.app/?vercelToolbarCode=Z8ZXdQSnX_vwUfo/api/chenkinVhl', {
        vehicleNo,
        parkingSlot
      });

      if (response.status === 200) {
        alert(response.data.message);
        setRecord((prevRecord) => 
          prevRecord.map(item =>
            item.vehicleNo === vehicleNo ? { ...item, isParked: true } : item
          )
        );
      }
    } catch (error) {
      console.error("Error checking in vehicle:", error);
      alert("Error checking in vehicle.");
    }
  };

  // Handle search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter records based on search term
  const filteredRecords = record.filter((item) => {
    return (
      item.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parkingSlot.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div>
        <input 
          type="text" 
          placeholder="Search by name, vehicle number, type or slot..." 
          value={searchTerm}
          onChange={handleSearchChange} 
          className="search-bar"
        />
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Vehicle Type</th>
              <th>Name</th>
              <th>Slot No</th>
              <th>Action</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((item) => (
                <tr key={item._id}>
                  <td>{item.vehicleNo}</td>
                  <td>{item.vehicleType}</td>
                  <td>{item.name}</td>
                  <td>{item.parkingSlot}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (item.isParked) {
                          removeVehicle(item.vehicleNo, item.parkingSlot);
                        } else {
                          checkInVehicle(item.vehicleNo, item.parkingSlot);
                        }
                      }}
                      style={{
                        backgroundColor: item.isParked ? 'red' : 'green',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      {item.isParked ? "Check-out" : "Check-in"}
                    </button>
                  </td>
                  <td>
                    <Link to={`/edit/${item._id}`} className="update-button">
                      <button>Update</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No matching vehicles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryParking;
