// ** Controller Imports **
import { createCustomerController } from "../controllers/createCustomer";
import { getCustomerController } from "../controllers/getCustomer";
import { getCustomersController } from "../controllers/getCustomers";

// ** Middleware Imports **
import {
  validateGetRequest,
  validatePostRequest,
} from "../middlewares/validateRequest";

// ** Validator Imports **
import * as customerValidators from "../validators/customerValidators";

// ===========================================================================
const express = require("express");
const router = express.Router();

// ===========================================================================
console.log(`customers route`);

// ** GET **
router.get("/", getCustomersController);
router.get(
  "/:id",
  validateGetRequest(customerValidators.getCustomerValidator),
  getCustomerController
);

// ** POST **
// router.post("/", createCustomerController);
router.post(
  "/",
  validatePostRequest(customerValidators.createCustomerSchema),
  createCustomerController
);

module.exports = router;
