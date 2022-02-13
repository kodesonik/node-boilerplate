
export default async (req, res, next) => {
    req.params = req.query
    next()
}
  