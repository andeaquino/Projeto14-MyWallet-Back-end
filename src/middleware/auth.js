import jwt from "jsonwebtoken";

async function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;

  if (!token) return res.status(401).send("No token provided");

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) return res.status(500).send("Failed to authenticate token");

    req.userId = decoded.userId;
    next();
  });
}

export default auth;
