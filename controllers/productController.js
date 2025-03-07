import Product from "../model/product.js";

export async function getProduct(req, res){
    try{
        const productList = await Product.findsdf()

        res.json({
        list : productList
    })
    }catch(e){
        res.json({
            message : "Error"
        })
    }
    
}

export function createProduct(req, res){

    console.log(req.user)

    if(req.user == null){
        res.json({
            message : "You are not logged in"
        })
        return
    }

    if(req.user.type != "admin"){
        res.json({
            messsage : "You are not an admin"
        })
        return
    }

    const product = new Product(req.body)

    product.save().then(()=>{
        res.json({
            message : "product created"
        })
    }).catch(()=>{
        res.json({
            message : "product not created" 
        })
    })
}

export function deleteProduct(req, res){
    Product.deleteOne({name : req.params.name}).then(
        ()=>{
            res.json({
                message : "Product delete successfully"
            })
        }
    ).catch(
    ()=>{
        res.json({
            message : "Product not created"
        })
    }
    )
}

export function getProductByName(req, res){
    const name = req.params.name;

    Product.find({name : name}).then(
        (productList)=>{
            res.json({
                list : productList
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Error"
            })
        }
    )
}