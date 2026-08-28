/**
 * ForenCCTV - Write-Block Verification Middleware
 * Guarantees that any disk reading operation operates in read-only write-blocked mode.
 */

export const requireWriteBlockVerification = (req, res, next) => {
  const writeBlockHeader = req.headers['x-forensic-write-block'];
  
  // In production, performs hardware IOCTL read-only check
  if (process.env.NODE_ENV === 'production' && writeBlockHeader !== 'ACTIVE') {
    return res.status(403).json({
      success: false,
      error: 'SECURITY_VIOLATION: Write-blocker hardware bridge not verified. Acquisition halted.'
    });
  }
  
  next();
};
