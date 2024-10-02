import Pets from "../../models/pets.js";

const petExists = async (req, res, next) => {
  const pet = await Pets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!pet) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  next();
};

export default petExists;
