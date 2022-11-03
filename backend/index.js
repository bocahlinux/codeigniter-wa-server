import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";

dotenv.config();

const app = express();

// (async()=>{
//     await db.sync();
// })();

//session
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto', //jika https true dan false utk http
    }
}));

app.use(cors({
    credentials: true,
    //origin: []
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);

app.listen(process.env.APPS_PORT, ()=> { 
    console.log('Server up and running...');
});