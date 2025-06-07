const express = require('express');
const app = express();
app.use(express.json());

let payments = [];

app.post('/process-payment', (req, res) => {
  const { orderId } = req.body;
  const success = Math.random() < 0.8; // 80% sukses

  if (success) {
    const payment = { orderId, status: 'SUCCESS' };
    payments.push(payment);
    console.log("Payment processed:", payment);
    res.json(payment);
  } else {
    const payment = { orderId, status: 'FAILED' };
    payments.push(payment);
    console.log("Payment failed:", payment);
    res.status(500).json({ message: 'Payment failed', orderId });
  }
});

app.post('/refund-payment', (req, res) => {
  const { orderId } = req.body;
  const payment = payments.find(p => p.orderId === orderId);
  if (payment) {
    payment.status = 'REFUNDED';
    console.log("Payment refunded:", payment);
    return res.json({ message: 'Payment refunded', payment });
  }
  res.status(404).json({ message: 'Payment not found' });
});

app.listen(3002, () => console.log('Payment Service running on port 3002'));
