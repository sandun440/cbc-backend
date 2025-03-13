import Product from "../model/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req, res){
    if(!isAdmin(req)){
        res.json({
            message : "Please login as administrator to add products"
        })
        return
    }

    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>{
        res.json({
            message : "product created"
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}

export function getProduct(req,res){
    Product.find({}).then((product)=>{
        res.json(product)
    })
}