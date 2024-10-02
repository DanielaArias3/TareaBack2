import Owners from "../../models/owners.js";

const ownerExists = async (req, res, next) => {
  const owner = await Owners.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!owner) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  next();
};

export default ownerExists;
