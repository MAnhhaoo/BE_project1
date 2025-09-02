const { json } = require('body-parser')
 const UserService = require('../services/UserService')
    const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmpass, phone } = req.body;

        if (!name || !email || !password || !confirmpass || !phone) {
            return res.status(400).json({
                status: "err",
                message: "The input is required",
            });
        }

        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckmail = reg.test(email);

        console.log("email valid?", isCheckmail);



        if (!isCheckmail) {
            return res.status(400).json({
                status: "err",
                message: "Email is invalid",
            });
        } else if (password !== confirmpass) {
            return res.status(400).json({
                status: "err",
                message: "pass must equal confirmpass"
            })
        }


        


        // Nếu email hợp lệ thì gọi service
        const result = await UserService.createUser(req.body);

        return res.status(200).json(result);

    } catch (e) {
        return res.status(500).json({
            message: e.message || e,
        });
    }
};



const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmpass, phone } = req.body;

        if (!email || !password ) {
            return res.status(400).json({
                status: "err",
                message: "The input is required",
            });
        }

        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckmail = reg.test(email);

        console.log("email valid?", isCheckmail);



        if (!isCheckmail) {
            return res.status(400).json({
                status: "err",
                message: "Email is invalid",
            });
        // } else if (password !== confirmpass) {
        //     return res.status(400).json({
        //         status: "err",
        //         message: "pass must equal confirmpass"
        //     })
        }


        


        // Nếu email hợp lệ thì gọi service
       const result = await UserService.loginUser(req.body);

// Lấy refresh_token ra
const { refresh_token, ...dataWithoutRefresh } = result.data;

// Set cookie bằng res chứ không phải result
res.cookie('refresh_token', refresh_token, {
    httpOnly: true, // chặn JS trên client đọc cookie
    secure: true,   // bắt buộc HTTPS
    sameSite: 'strict' // chống CSRF (nên thêm)
});
// Chỉ trả lại user + access_token
return res.status(200).json({
  status: result.status,
  message: result.message,
  data: dataWithoutRefresh
});


    } catch (e) {
        return res.status(500).json({
            message: e.message || e,
        });
    }
};


const UpdateUser = async (req, res) => {
    try {
        const UserId = req.params.id
        console.log("id" , UserId)
        const Data = req.body

        if(!UserId){
            return res.status(400).json({
                status : "err",
                message: "user don't have"
                
            })
        }
        // Nếu email hợp lệ thì gọi service
        const result = await UserService.UpdateUser(UserId , Data );

        return res.status(200).json(result);

    } catch (e) {
        return res.status(500).json({
            message: e.message || e,
        });
    }
};


const DeleteUser = async (req , res) => {
    try {   
        const UserId = req.params.id
        console.log("iduser=" , UserId)
        // const token = req.headers
        // console.log("token" , token)
        if(!UserId) {
            return res.status(404).json({
                status: "err",
                message: "can not seek id user",
            })
           
        }
         // neu co user thi goi service 
            const result = await UserService.DeleteUser(UserId);
            return res.status(200).json(result)
        
    } catch (e) {
        return res.status(500).json({
                message: e.message || e
        })
        
    }
}



const getAllUser = async (req , res) => {

    try {
        const result = await UserService.getAllUser()
        return res.status(200).json(result)
    } catch (e) {
        return res.status(404).json({
            message : e.message || e
        })
        
    }

}

const getDetail = async (req , res) => {
    try {
        // lay id user
        const idUser = req.params.id
        if(!idUser) {
            return res.status(404).json({
                status :"err",
                message: "can not look for id user"
            })
        }

        // xu ly viec tim user xong goi qua Service
        const result = await UserService.getDetail(idUser)
        return res.status(200).json(result)

        } catch (e) {
        return res.status(404).json({
            message : e.message || e 
        })
    }
}

const refreshToken = async (req, res) => {
  try {
    // Lấy refresh_token trực tiếp từ cookie
    const token = req.cookies.refresh_token;
    console.log("refresh_token từ cookie:", token);

    if (!token) {
      return res.status(401).json({
        status: "err",
        message: "Refresh token is required",
      });
    }

    // Gọi service xử lý
    const result = await JwtService.refreshToken(token);

    return res.status(200).json(result);
  } catch (e) {
    console.error("refreshToken error:", e);
    return res.status(403).json({
      status: "err",
      message: e.message || "Invalid refresh token",
    });
  }
};


module.exports = {
    createUser ,
    loginUser ,
    UpdateUser,
    DeleteUser,
    getAllUser ,
    getDetail , 
    refreshToken
}