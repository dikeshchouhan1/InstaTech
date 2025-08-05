import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found. Unauthorized access." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; // Use consistent naming with your other controllers
    next();
  } catch (err) {
    return res.status(401).json({ message: `Authentication failed: ${err.message}` });
  }
};

export default isAuth;
