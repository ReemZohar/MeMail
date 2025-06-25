const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 9090;
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// All routes centralized here
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found\n' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Uncaught error:", err.stack);
  res
    .status(500)
    .json({ error: err.message || "Internal Server Error" });
});