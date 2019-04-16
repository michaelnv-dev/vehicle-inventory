var mongoose = require('mongoose');  
var VehicleSchema = new mongoose.Schema({  
  id: { type: String, default: uuidv4 },
  name: String,
  timestamp: { type:Number, default: Math.floor(new Date() / 1000) },
  type:{ type: String, enum : ['SUV','Truck','Hybrid'] },
  last_successful_connection: Number //(Epoch timestamp)
});
mongoose.model('Vehicle', VehicleSchema);

module.exports = mongoose.model('Vehicle');