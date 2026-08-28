import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'ForenCCTV Forensic Engine Service',
    version: '2.4.0',
    writeBlockEnforced: config.writeBlockStrictEnforcement,
    timestamp: new Date().toISOString()
  });
});

// Forensic Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[ForenCCTV Backend] Forensic API server running on port ${config.port}`);
});
