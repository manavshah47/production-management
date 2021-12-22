const mongoose = require("mongoose");



mongoose.connect("mongodb://127.0.0.1:27017/jay-sap", {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))
