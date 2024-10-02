import jwt from "jsonwebtoken";
import Vets from "../../models/vets.js";

const authorizateVet = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const { vetId: vetId } = jwt.verify(token, "TokenVet");

    const vetExists = await Vets.findOne({
      where: {
        id: +vetId,
      },
    });

    if (!vetExists) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token invalid" });
  }
};

export default authorizateVet;
