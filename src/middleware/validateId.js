// src/middleware/validateId.js
export function validateId(req, res, next) {
  const idNum = Number(req.params.id);

  // Check if ID is a valid integer
  if (!Number.isInteger(idNum)) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['ID must be a number'],
    });
  }

  next(); // proceed to controller if valid
}
