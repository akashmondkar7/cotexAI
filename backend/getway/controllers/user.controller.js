export const getCurrentUser= async (req,resp) => {
    try {
        return resp.status(200).json(req.user)
    } catch (error) {
         return resp.status(500).json({massage:`get current user error ${error}`})
    }
}