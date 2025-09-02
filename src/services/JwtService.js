const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();


const genneralAccessToken = (payload) => {
    console.log("payload", payload)
    const accessToken = jwt.sign({...payload }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return accessToken
}

const genneralRefreshToken = (payload) => {
    console.log("payload", payload)
    const refreshToken = jwt.sign({...payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refreshToken
}





const refreshToken = async (token) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);

    // Tạo access_token mới
    const access_token = genneralAccessToken({
      id: decoded?.id,
      isAdmin: decoded?.isAdmin,
    });

    return { 
      status: "ok",
      message: "success",
      data: { access_token },
    };
  } catch (e) {
    throw new Error(e.message || "Invalid refresh token");
  }
};



module.exports = {
    genneralAccessToken ,
    genneralRefreshToken  ,
    refreshToken
}
 