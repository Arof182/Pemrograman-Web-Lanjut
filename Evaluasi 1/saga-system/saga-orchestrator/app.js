const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/create-order-saga', async (req, res) => {
  let order;
  try {
    order = await axios.post('http://localhost:3001/create-order', req.body);
    const orderId = order.data.id;

    const payment = await axios.post('http://localhost:3002/process-payment', { orderId });

    try {
      const shipping = await axios.post('http://localhost:3003/start-shipping', { orderId });
      res.json({ message: 'Order successfully created and shipped.', orderId });
    } catch (shippingError) {
      await axios.post('http://localhost:3003/cancel-shipping', { orderId });
      await axios.post('http://localhost:3002/refund-payment', { orderId });
      await axios.post('http://localhost:3001/cancel-order', { orderId });
      res.status(500).json({ message: 'Shipping failed. Rolled back all changes.' });
    }

  } catch (paymentError) {
    if (order?.data?.id) {
      await axios.post('http://localhost:3001/cancel-order', { orderId: order.data.id });
    }
    res.status(500).json({ message: 'Payment failed. Order cancelled.' });
  }
});

app.listen(3000, () => console.log('Saga Orchestrator running on port 3000'));
