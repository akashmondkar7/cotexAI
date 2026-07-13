import { auth,googleProvider } from "../utils/firebase"
import { signInWithPopup } from "firebase/auth"

function App() {

const googleLogin = async ()=>{
 const data = await signInWithPopup(auth, googleProvider)
 console.log(data)
}

  return (
    <div className='w-full h-screen bg-black  flex items-center justify-center'>
      <button className='w-50 h-24 bg-white text-black ' onClick={googleLogin}>
        continue with google
      </button>
    </div>
  )
}

export default App
