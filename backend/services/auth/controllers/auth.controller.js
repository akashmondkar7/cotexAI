import {} from "firebase-admin/auth"
import App from "../../../../frontend/src/App"
import User from "../model/user.model"
import { createConnection } from "mongoose"
import redis from "../../../shared/redis/redis.js"
import { json } from "express"
export const login=async (req,resp) =>{
    try {
        const {token}=req.body
        
      const  decoded= await getAuth(App).verifyIdToken(token)
      let user= await User.findOne({
    firebaseUid:decoded.uid


      })
      if(!user){
        user=await User.create({
            firebaseUid:decoded.uid,
            name:decoded.name,
            email:decoded.email,
            avatar:decoded.picture
        })
      }

    const sessionId=crypto.randomUUID()

   await redis.set(`session-${sessionId}`,json.stringify({
    userID:user._id,
    name:user.name,
    email:user.email,
    avatar:user.avatar
   }),"EX",7*24*60*60)

    resp.cookie("session",sessionId,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    return resp.status(200).json(user)

    } catch (error) {
        return resp.status(500).json({massage:`Login error${error}`})
    }
}

export const logout =async (req,resp)=>{
  try {
    const sessionId=req.cookies?.session
    await redis.del(`session-${sessionId}`)

    resp.clearCookie("session")
        return resp.status(200).json({massage:"logout succesfully"})

  } catch (error) {
    return resp.status(500).json({massage:` ${error}`})

  }
}

