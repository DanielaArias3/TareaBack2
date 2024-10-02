import jwt from "jsonwebtoken";
import Owners from "../../models/owners.js";

const authorizateOwner = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const { ownerId: ownerId } = jwt.verify(token, "TokenOwner");

    const ownerExists = await Owners.findOne({
      where: {
        id: +ownerId,
      },
    });

    if (!ownerExists) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token invalid" });
  }
};

export default authorizateOwner;
