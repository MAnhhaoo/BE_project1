const { json } = require('body-parser')
 const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock ,rating   } = req.body;
        
        // VI tat ca deu co require: true
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(400).json({
                status: "err",
                message: "The input is required sdadsa",
            });
        }
        // Nếu ok hợp lệ thì gọi service
        const result = await ProductService.createProduct(req.body);

        return res.status(200).json(result);

    } catch (e) {
        return res.status(500).json({
            message: e.message || e,
        });
    }
};




const  updateProduct = async (req,res) => {
    try {
        // bước 1 : lấy id của spam cẩn sửa thì dùng params
        const checkID = req.params.id 
        console.log("id" ,req.params.id  ) 
        // Data dùng để gửi lên những nội dung cần sửa
        const Data = req.body
        if(!checkID) {
            return res.status(400).json({
                status :"errr",
                message: "id don't have"
            })
        }  
            const result = await ProductService.updateProduct(checkID , Data)
            return res.status(200).json(result)
    } catch (e) {
        return res.status(404).json({
            message : message.e || e
        })
    }
} 

const detailProduct = async (req,res) => {
    try {
        const checkID = req.params.id
        console.log("id1" , checkID)
        if(!checkID) {
            return res.status(400).json({
                status : "err",
                message : "can not found id"
            })
        }

        const result = await ProductService.detailProduct(checkID)
        return res.status(200).json(result)
        
    } catch (e) {
        return res.status(404).json({
            message : message.e || e
        })
    }
}

    const deleteProduct = async(req,res) => {
        try {   
            const checkID = req.params.id
            console.log("chekid" , checkID)
            if(!checkID) {
                return res.status(400).json({
                    status : "err",
                    message : "id do not have"
                })
            }
            const result = await ProductService.deleteProduct(checkID);
            return res.status(200).json(result)           
        } catch (e) {
            return res.status(404).json({
                status : "err",
                message : message.e || e
            })
        }
    }

    const allProduct = async (req , res) => {
        try {
            const {limit , page , sort , filter}= req.query
            // (limit || 4 , page || 0) nếu k bắt được quẻy thì auto trả lại là limit 4 và page 0
            const result = await ProductService.allProduct(limit || 4 , page || 0 , sort , filter )
            return res.status(200).json(result)
            
        } catch (e) {
            return res.status(404).json({
                status : "err",
                message : message.e || e
            })
        }
    }

module.exports = {
  createProduct,
    updateProduct , 
    detailProduct , 
    deleteProduct ,
    allProduct
    
}