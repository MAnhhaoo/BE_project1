const User = require("../models/UserModels");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmpass, phone } = newUser;

    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
       return resolve({
          status: "err",
          message: "email had be used",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      console.log("test pass", hash);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        // confirmpass: hash,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "ok",
          message: "success",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmpass, phone } = userLogin;

    try {

      const checkUser = await User.findOne({
        email : email ,
      });

      if (checkUser === null) {
       return resolve({
          status: "err",
          message: "email don't have ",
        });
      }
      

      const comparePass = bcrypt.compareSync(password, checkUser.password);
      // console.log("pass1 " , checkUser.password )
      // console.log("pass2 " , password )
      // console.log("pass", comparePass);

      if (!comparePass) {
      return  resolve({
          status: "err",
          message: "pass wrong",
        });
      }

      const access_token = genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      console.log("access_token", access_token);

       // 4. Xóa password trước khi trả ra client
      const userData = checkUser.toObject();
      delete userData.password;
      const refresh_token = genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      })

      console.log("refresh_token", refresh_token)

      resolve({
        status: "ok",
        message: "success",
        data: {
          user: userData,
          access_token, // tra token ve cho user 
          refresh_token // trả về trong cookie
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};


const UpdateUser = (id , Data) => {
  return new Promise(async (resolve, reject) => {
    // const { name, email, password, confirmpass, phone } = UpdateUser;

    try {

      const checkUser = await User.findOne({
        _id : id ,
      });
      console.log("user" , checkUser)

      if (checkUser === null) {
       return resolve({
          status: "err",
          message: "email don't have ",
        });
      }

      const update = await User.findByIdAndUpdate(id , Data ,{new: true})

      
       const userData = update.toObject();
      delete userData.password;

    
      resolve({
        status: "ok",
        message: "success",
        data : {
          user : userData
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};


const DeleteUser = async (id) => {
  try {
    const checkUser = await User.findOne({ _id: id });
    if (!checkUser) {
      return {
        status: "err",
        message: "không thấy id",
      };
    }

    const deletedUser = await User.findByIdAndDelete(id);
    return {
      status: "ok",
      message: "delete user success",
      data: deletedUser,
    };
  } catch (e) {
    throw e; // để controller bắt lỗi
  }
};

const getAllUser = async () => {
  try {
    const allUser = await User.find()
    return {
      status : "ok",
      message : "get success" ,
      data : allUser
    }
  } catch (e) {
    throw(e)
  }
}

const getDetail = async (id) => {
  try {
    const checkUser = await User.findOne({
      _id : id
    })

    if(!checkUser){
      return res.status(404).json({
        status : "err" ,
        message : "can not found id user"
      })
      // neu co thì trả dữ liệu về 
    
    }
  return {
        status : "ok",
        message : "success",
        data : checkUser
      }
  } catch (e) {
    throw(e)
  }
}



module.exports = {
  createUser,
  loginUser,
  UpdateUser,
  DeleteUser,
  getAllUser ,
  getDetail 
};
