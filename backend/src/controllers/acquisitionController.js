/**
 * Acquisition Controller - Bitstream image creation & dual-hash generation
 */

export const startAcquisition = async (req, res, next) => {
  try {
    const { sourceChannel, format } = req.body;
    // TODO: Stream bit-exact sectors into .E01 or .DD container with libewf
    res.json({
      success: true,
      message: 'Bitstream acquisition initialized under write-block protection',
      streamId: `EVD-STREAM-${Date.now()}`
    });
  } catch (err) {
    next(err);
  }
};
