import Vets from "../../models/vets.js";

const vetExists = async (req, res, next) => {
  const vet = await Vets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!vet) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  next();
};

export default vetExists;
