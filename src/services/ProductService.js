const Product = require("../models/ProductModels");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createProduct = async (newProduct) => {
    const { name, image, type, price, countInStock ,rating  } = newProduct;

    try {
      const checkName = await Product.findOne({
        name: name,
      });
      if (checkName !== null) {
        return({
          status: "err",
          message: "email had be used",
        });
      }
      const Productcreated = await Product.create({
        name, image, type, price, countInStock ,rating 
      });
      if (Productcreated) {
        return({
          status: "ok",
          message: "success",
          data: Productcreated,
        });
      }

    } catch (e) {
        throw (e);
        }
  
};



const updateProduct = async (id , data) =>{
    try {
        const checkID = await Product.findOne({
            _id : id
        })
        if(!checkID) {
            return (
                {status : "err",
                message : "do not have id of product"}
            )
        }

        const ProductUpdated = await Product.findByIdAndUpdate(id , data , {new : true})

        return ({
            status : "ok",
            message : "product already updated" ,
            data : ProductUpdated
        })

    } catch (e) {
        throw(e)
    }
}


const detailProduct = async (id) =>{
  try {
    const checkID = await Product.findOne({
      _id : id
    })
    if(!checkID){
      return res.status(404).json({
        status: "err",
        message  : "don have id"
      })
    }
    return ({
      status :"ok",
      message : "success",
      data : checkID
    })
  } catch (e) {
    throw (e);
  }
}

const deleteProduct = async(id) =>{
  try {
    const checkID = await Product.findOne({
      _id : id
    })
    if(!checkID) {
      return res.status(400).json({
        status : "err",
        message : "can not found id"
      })
    }
    const deleteItem = await Product.findByIdAndDelete(id);
    return ({
      status: "ok",
      message: "delete ok",
    })
  } catch (e) {
    throw(e)
  }
}

const allProduct = async(limit  , page  ,sort , filter ) => {
  try {
    const totalProduct = await Product.countDocuments()
    const pageCurrent = Number (page) + 1
    const totalPage = Math.ceil(totalProduct / limit) 
    // filter 
    if(filter){
      const name = filter[0]
      const allObjectFilter = await Product.find({
        [name] : {'$regex' : filter[1]}
        
      }).limit(limit).skip(limit * page)
        return ({
      status : "ok",
      message : "success",
      data : allObjectFilter ,
      total : totalProduct ,
      pageCurrent,
      totalPage

    })
    }
    // sort
    if(sort) {
      const objectSort = {}
      objectSort[sort[1]] = sort[0]
      console.log("first" , objectSort)
  const getAllpro = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
return ({
      status : "ok",
      message : "success",
      data : getAllpro ,
      total : totalProduct ,
      pageCurrent,
      totalPage

    })
    }
const getAll = await Product.find().limit(limit).skip(limit * page)
    return ({
      status : "ok",
      message : "success",
      data : getAll ,
      total : totalProduct ,
      pageCurrent,
      totalPage

    })


    // sort({  name : sort }) có nghĩa là sort theo name
  
    
  } catch (e) {
    throw (e)
  }
}

module.exports = {
  createProduct ,
  updateProduct ,
  detailProduct ,
  deleteProduct ,
  allProduct
};
