const express = require('express');
const app = express();
app.use(express.json());

let shipments = [];

app.post('/start-shipping', (req, res) => {
  const { orderId } = req.body;
  const success = Math.random() < 0.7; // 70% sukses

  if (success) {
    const shipment = { orderId, status: 'SHIPPED' };
    shipments.push(shipment);
    console.log("Shipping started:", shipment);
    res.json(shipment);
  } else {
    console.log("Shipping failed for order:", orderId);
    res.status(500).json({ message: 'Shipping failed', orderId });
  }
});

app.post('/cancel-shipping', (req, res) => {
  const { orderId } = req.body;
  const shipment = shipments.find(s => s.orderId === orderId);
  if (shipment) {
    shipment.status = 'CANCELLED';
    console.log("Shipping cancelled:", shipment);
    return res.json({ message: 'Shipping cancelled', shipment });
  }
  res.status(404).json({ message: 'Shipment not found' });
});

app.listen(3003, () => console.log('Shipping Service running on port 3003'));
