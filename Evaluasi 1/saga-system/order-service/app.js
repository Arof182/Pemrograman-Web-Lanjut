const express = require('express');
const app = express();
app.use(express.json());

let orders = [];
let orderId = 1;

app.post('/create-order', (req, res) => {
  const order = {
    id: orderId++,
    status: 'PENDING',
    ...req.body
  };
  orders.push(order);
  console.log("Order created:", order);
  res.status(201).json(order);
});

app.post('/cancel-order', (req, res) => {
  const { orderId } = req.body;
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = 'CANCELLED';
    console.log("Order cancelled:", order);
    return res.json({ message: 'Order cancelled', order });
  }
  res.status(404).json({ message: 'Order not found' });
});

app.listen(3001, () => console.log('Order Service running on port 3001'));
