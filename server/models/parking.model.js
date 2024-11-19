const mongoose = require("mongoose");

const parkingSlots = new mongoose.Schema({
    slot: { type: String, required: true },
    isOccupied: { type: Boolean, default: false },
});

const vehicleSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    name: { type: String, required: true },
    parkingSlot: { type: String, required: true },
    isParked: { type: Boolean, default: true },
},{ timestamps: true });

const vehicleModel = mongoose.model("Vehicle", vehicleSchema);
const parkingModel = mongoose.model("ParkingSlot", parkingSlots);

module.exports = { vehicleModel, parkingModel };
