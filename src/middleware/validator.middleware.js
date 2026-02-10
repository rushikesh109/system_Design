export const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];

  //Validate name

  if (!name || typeof name !== "string" || name.trim().length < 3) {
    errors.push("Name must be at least 3 characters");
  }

  //Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Valid email is required");
  }

  //If there are errorss, return 400;
  if (errors.length > 0) {
    return res.status(400).json({
        success: false,
        error: {
            message: 'Validation failed',
            details: errors
        }
    })
  }

  next()
};

// Partial validation for PATCH (only validate fields that are present)
export const validatePartialUser = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];
  
  // Only validate name if it's provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 3) {
      errors.push('Name must be at least 3 characters');
    }
  }
  
  // Only validate email if it's provided
  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Valid email is required');
    }
  }
  
  // Age validation (if provided)
  if (req.body.age !== undefined) {
    const age = parseInt(req.body.age);
    if (isNaN(age) || age < 0 || age > 150) {
      errors.push('Age must be a valid number between 0 and 150');
    }
  }
  
  // If there are errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors
      }
    });
  }
  
  next();
};

export const validateUserId = (req, res, next) =>{
   const {id} = req.params;

   if(!id || isNaN(id)){
    return res.status(400).json({
        success: false,
        error: {
            message: "Invalid user ID"
        }
    })
   }

   next();
}
