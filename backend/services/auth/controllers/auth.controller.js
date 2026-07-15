import {} from "firebase-admin/auth"
import App from "../../../../frontend/src/App"
import User from "../model/user.model"
import { createConnection } from "mongoose"
export const login=async (req,resp) =>{
    try {
        const {token}=req.body
        
      const  decoded= await getAuth(App).verifyIdToken(token)
      const user= await User.findOne({
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