const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "smartcitizen_users"
});

db.connect(err => {
    if (err) throw err;
    console.log("Terhubung ke database user-service");
});

// Endpoint untuk mendapatkan semua user
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Jalankan server
app.listen(5001, () => {
    console.log("User Service berjalan di port 5001");
});
