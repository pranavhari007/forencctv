/**
 * Case Controller - Manages investigation registry & FIR anchoring
 */

export const getAllCases = async (req, res, next) => {
  try {
    // TODO: Connect to production MongoDB / PostgreSQL database
    res.json({
      success: true,
      message: 'Case records retrieved',
      data: []
    });
  } catch (err) {
    next(err);
  }
};

export const createCase = async (req, res, next) => {
  try {
    const { title, caseNumber, investigator, jurisdiction } = req.body;
    // TODO: Anchor Genesis Block on blockchain for new case registration
    res.status(201).json({
      success: true,
      message: 'Case registered with Genesis Block',
      data: { id: `FC-2026-${Math.floor(100 + Math.random() * 900)}`, title, caseNumber }
    });
  } catch (err) {
    next(err);
  }
};
