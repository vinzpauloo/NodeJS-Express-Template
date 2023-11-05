// ** Third Party Imports **
import Joi from "joi";

// ===========================================================================
export const getCustomerValidator = Joi.object({
  id: Joi.string().length(24).required().messages({
    "string.length": "Invalid Customer ID format",
    "any.required": "Customer ID is required",
  }),
});

// ===========================================================================
export const createCustomerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().lowercase().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  phone: Joi.number()
    .custom((value, helpers) => {
      if (value.toString().length > 10) {
        return helpers.error("number.base", {
          message: "Phone number cannot be longer than 10 digits.",
        });
      }
      return value;
    })
    .optional(),
  address: Joi.string().max(100).optional().messages({
    "string.max": "Address must be less than 100 characters.",
  }),
});
