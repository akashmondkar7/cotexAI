import redis from "../../shared/redis/redis.js"

const protect=async (req,resp,next) => {
    try {
        const sessionId=req.cookies?.session
        if(!sessionId){
            return resp.status(400).json({massage:"unauthorized"})
        }

      const session=  await redis.get(`session-${sessionId}`)
      if(!session){
        return resp.status(400).json({massage:"session expired"})
      }
      req.user=JSON.parse(session)
      next()

    } catch (error) {
                    return resp.status(500).json({massage:`protect error ${error}`})

    }
}

export default protect ;