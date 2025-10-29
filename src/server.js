// src/server.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Serve /public so bundled.yaml is reachable at /bundled.yaml
app.use(express.static('public'));

// Swagger UI: fetch the spec from /bundled.yaml (built at deploy time)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: { url: '/bundled.yaml' },
  })
);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/tasks', taskRoutes);

// 404 handler (for unmatched routes)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
