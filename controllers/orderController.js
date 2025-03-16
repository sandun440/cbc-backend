import Order from "../model/order.js";
import { isCustomer } from "./userController.js";
import Product from "../model/product.js";

export async function createOrder(req, res) {
  if (!isCustomer) {
    res.json({
      message: "Please log in as customer to create orders",
    });
  }

  //take the lastest product id

  try {
    const lastestOrder = await Order.find().sort({ orderId: -1 }).limit(1);

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

    const newProductArray = [];

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderData.orderedItems[i].productId,
      });

      if (product === null) {
        res.json({
          message:
            "Product with id " +
            newOrderData.orderedItems[i].productId +
            " not found",
        });
        return;
      }

      newProductArray[i] = {
        Name: product.productName,
        price: product.price,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.images[0],
      };
    }

    newOrderData.orderedItems = newProductArray;

    newOrderData.orderId = orderId;

    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);

    const savedOrder = await order.save();

    res.json({
      message: "Order created",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getOrders(req, res) {
    
    try {
      if (isCustomer(req)) {
      const orders = await Order.find({ email: req.user.email });
  
      res.json(orders);
      return;
      }else if(isAdmin(req)){
        const orders = await Order.find({});
  
        res.json(orders);
        return;
      }else{
        res.json({
          message: "Please login to view orders"
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

export async function getQuote(req, res) {
  try {
    const newOrderData = req.body;

    const newProductArray = [];

    let total = 0;
    let labeledTotal = 0;

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderData.orderedItems[i].productId,
      });

      if (product == null) {
        res.json({
          message:
            "Product with id " +
            newOrderData.orderedItems[i].productId +
            " not found",
        });
        return;
      }
      labeledTotal += product.price * newOrderData.orderedItems[i].qty;
      total += product.lastPrice * newOrderData.orderedItems[i].qty;
      newProductArray[i] = {
        name: product.productName,
        price: product.lastPrice,
        labeledPrice: product.price,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.images[0],
      };
    }
    newOrderData.orderedItems = newProductArray;
    newOrderData.total = total;

    res.json({
      orderedItems: newProductArray,
      total: total,
      labeledTotal: labeledTotal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
