import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    // On récupère le token dans les cookies (plus facile à gérer avec insomnia)
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Please login" });

    // On récupère les information du token
    const decoded = jwt.verify(token, process.env.SECRET);

    // on hydrate les informations de user dans la requête
    req.user = decoded;

    // on continue
    next();
  } catch (e) {
    return res.status(401).json({ message: "Please login" });
  }
}
