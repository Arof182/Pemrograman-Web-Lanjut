import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// API Gateway meneruskan permintaan ke layanan user-service
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5001/users');
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error mengambil data user");
    }
});

// API Gateway meneruskan permintaan ke layanan report-service
app.get('/reports', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5002/reports');
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error mengambil data laporan");
    }
});

app.listen(5000, () => {
    console.log("API Gateway berjalan di port 5000");
});
