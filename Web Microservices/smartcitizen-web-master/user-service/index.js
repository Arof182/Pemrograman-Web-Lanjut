import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

// Koneksi ke database khusus User Service
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_service_db"
});

// API untuk mendapatkan daftar pengguna
app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API untuk menambahkan user baru
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
        if (err) throw err;
        res.send("User berhasil ditambahkan!");
    });
});

app.listen(5001, () => {
    console.log("User Service berjalan di port 5001");
});
