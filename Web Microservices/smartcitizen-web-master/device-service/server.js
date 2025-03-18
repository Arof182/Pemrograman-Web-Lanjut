const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "smartcitizen_devices"
});

db.connect(err => {
    if (err) throw err;
    console.log("Terhubung ke database device-service");
});

// Endpoint untuk mendapatkan semua device
app.get("/devices", (req, res) => {
    db.query("SELECT * FROM devices", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Jalankan server
app.listen(5002, () => {
    console.log("Device Service berjalan di port 5002");
});
