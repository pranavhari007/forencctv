/**
 * ForenCCTV Global Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[FORENSIC ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Forensic Processing Error',
    timestamp: new Date().toISOString()
  });
};
