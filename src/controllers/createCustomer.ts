import { createCustomerSchema } from "../validators/customerValidators";

export async function createCustomerController(req: any, res: any) {
  try {
    const { db } = req.app;

    const { name, email, phone, address } = req.body;

    // ** Check if customer exists **
    const existingCustomer = await db.collection("customers").findOne({
      email: email.toLowerCase(),
    });

    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const result = await db.collection("customers").insertOne({
      name,
      email,
      phone,
      address,
    });

    if (result.acknowledged) {
      res.status(200).json({ message: "Customer created" });
    } else {
      res.status(400).json({ message: "Customer could not be created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
