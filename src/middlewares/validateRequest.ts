// ** This middleware is used to validate the request body
import { Request, Response, NextFunction } from "express";

// ===========================================================================
export const validateGetRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params); // assuming you're validating route parameters

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  };
};

// ===========================================================================
export const validatePostRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body); // Change from req.params to req.body

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  };
};
