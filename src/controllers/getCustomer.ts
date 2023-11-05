// ** MongoDB Imports **
import { ObjectId } from "mongodb";

// ===========================================================================
export async function getCustomerController(req: any, res: any) {
  try {
    const { db } = req.app;

    const id = req.params.id;

    const result = await db.collection("customers").findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer found",
      customer: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
