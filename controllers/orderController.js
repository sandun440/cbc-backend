import Order from "../model/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    if (!isCustomer) {
        res.json({
            message: "Please log in as customer to create orders",
        });
    }

  //take the lastest product id

try {
    const lastestOrder = await Order.find().sort({ date: -1 }).limit(1);

    let orderId;

    if (lastestOrder.length == 0) {
        orderId = "CBC0001";
    } else {
        const currentOrderId = lastestOrder[0].orderId;
        const numberString = currentOrderId.replace("CBC", "");
        const number = parseInt(numberString, 10);
        const newNumber = (number + 1).toString().padStart(4, "0");
        orderId = "CBC" + newNumber;

    }

    const newOrderData = req.body;

    newOrderData.orderId = orderId;

    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);

    await order.save();

    res.json({
        message: "Order created",
    });
} catch (error) {
    res.status(500).json({
        message: error.message,
    });
}
}
