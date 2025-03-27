const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connection = require("./Model/dbConnect");
const router = require("./Routes/authRoutes");
const SupscriptonRouter = require("./Routes/subscriptionRoutes");
const tokenRoutes = require('./Routes/tokenRoutes');
const logrouter = require('./Routes/logRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use(express.json());


app.use("/", router);
app.use("/", SupscriptonRouter);
app.use("/", tokenRoutes);
app.use("/",logrouter)


connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));