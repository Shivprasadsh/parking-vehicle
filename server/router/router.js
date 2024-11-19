const express = require("express");
const router = express.Router();
const { vehicleModel, parkingModel } = require("../models/parking.model");

const parkingSlots = [
    { slot: "A1", isOccupied: false },
    { slot: "A2", isOccupied: false },
    { slot: "A3", isOccupied: false },
    { slot: "A4", isOccupied: false },
    { slot: "B1", isOccupied: false },
    { slot: "B2", isOccupied: false },
    { slot: "B3", isOccupied: false },
];

async function initializeParkingSlots() {
    try {
        const count = await parkingModel.countDocuments();
        if (count === 0) {
            await parkingModel.insertMany(parkingSlots);
            console.log("Parking slots initialized");
        }
    } catch (err) {
        console.log("Error initializing parking slots", err);
    }
}

initializeParkingSlots();

router.post('/parkIn', async (req, res) => {
    try {
        const { vehicleNo, vehicleType, name, parkingSlot } = req.body;

        let slot = await parkingModel.findOne({ slot: parkingSlot });

        if (!slot) {
            return res.status(404).json({ message: "Parking slot not found" });
        }

        if (slot.isOccupied) {
            return res.status(409).json({ message: "Slot already booked, please choose another slot!" });
        }

        const parking = await vehicleModel.create({
            vehicleNo,
            vehicleType,
            name,
            parkingSlot
        });

        await parkingModel.findOneAndUpdate({ slot: parkingSlot }, { isOccupied: true });

        res.status(201).json({
            message: "Vehicle parked successfully",
            parking: {
                vehicleNo: parking.vehicleNo,
                vehicleType: parking.vehicleType,
                name: parking.name,
                parkingSlot: parking.parkingSlot
            }
        });
    } catch (error) {
        console.error("Error while parking vehicle:", error);
        res.status(500).json({ message: "Failed to park vehicle", error: error.message });
    }
});

router.post('/removeVehicle', async (req, res) => {
    try {
        const { vehicleNo, parkingSlot } = req.body;

        if (!vehicleNo || !parkingSlot) {
            return res.status(400).json({ message: "Vehicle number and parking slot are required." });
        }

        const vehicle = await vehicleModel.findOne({ vehicleNo, isParked: true });

        if (!vehicle) {
            return res.status(404).json({ message: "No such vehicle found in the parking system." });
        }

        vehicle.isParked = false;
        await vehicle.save();

        await parkingModel.findOneAndUpdate({ slot: parkingSlot }, { isOccupied: false });

        res.status(200).json({
            message: "Vehicle removed successfully",
            vehicle
        });
    } catch (error) {
        console.error("Error removing vehicle:", error);
        res.status(500).json({ message: "Failed to remove vehicle", error: error.message });
    }
});


router.get('/summary', async (req, res) => {
    try {
        const vehicles = await vehicleModel.find().sort({ createdAt: -1 }); 
        res.status(200).json(vehicles);
    } catch (error) {
        console.error("Error fetching summary:", error);
        res.status(500).json({ message: "Failed to fetch vehicles", error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const {id }= req.params
        const { vehicleNo, vehicleType, name, parkingSlot } = req.body;

        const vehicleUpdate = await vehicleModel.findByIdAndUpdate(id, {
            vehicleNo,
            vehicleType,
            name,
            parkingSlot
        }, { new: true });

        if (!vehicleUpdate) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json({ message: "Vehicle updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred while updating vehicle details" });
    }
});

router.get('/details/:id',async(req,res)=>{
    try {
        const {id} = req.params;

    const vehicle = await vehicleModel.findById(id)

    if(!vehicle){
        return res.status(404).json({message:"Vehica not found"})
    }
    res.status(200).json(vehicle)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred while fetching vehicle details" })  
    }
    
})


router.post('/chenkinVhl',async(req,res)=>{
    try {
      const {vehicleNo,parkingSlot} = req.body
       const vehicle = await vehicleModel.findOne({vehicleNo,isParked:false});
       
       if(!vehicle){
        return res.status(404).json({message:"Vehichle already parked or does not exit"})

       }

       vehicle.isParked = true;
       vehicle.parkingSlot = parkingSlot
       await vehicle.save()

       await parkingModel.findOneAndUpdate({slot:parkingSlot},{isOccupied:true})

       res.status(200).json({message:'vehicle cheked In',vehicle})
    } catch (error) {
        console.error("Error checking in vehicle:", error);
    res.status(500).json({ message: "Failed to check in vehicle", error: error.message });
    }
})

router.get('/availbaleslot',async(req,res)=>{
    try {
       const availbaleslot = await parkingModel.find({isOccupied:false})
       res.status(404).json(availbaleslot)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching available slots" });
    }
})



module.exports = router;
