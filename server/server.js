const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const DbConnect = require('./database');
require('dotenv').config();
const app = express();

// routes
const authRouter = require("./routes/auth-routes");
const roomRouter = require("./routes/room-routes");
const PORT = process.env.PORT || 5500;

// database connection
DbConnect();

// middlewares
const corsOption = {
    credentials: true,
    origin: [process.env.ORIGIN],
};
app.use(cors(corsOption));
app.use(express.json({ limit: '5mb' }));
app.use(helmet());
app.use(morgan("common"));

// routes
app.use("/api/auth", authRouter);
app.use("/api/room",roomRouter);

// server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));