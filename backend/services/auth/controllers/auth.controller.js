import {} from "firebase-admin/auth"
import App from "../../../../frontend/src/App"
export const login=async (req,resp) =>{
    try {
        const {token}=req.body
        
      const  decoded=getAuth(App).verifyIdToken(token)
    } catch (error) {
        
    }
}