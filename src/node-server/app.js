const express = require('express');
const app = express();
const PORT = 9090;

app.use(express.json());

// All routes centralized here
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
