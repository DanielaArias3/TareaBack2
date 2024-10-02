const checkVetById = (req, res, next) => {
  if (Number.isNaN(Number.parseInt(req.params.id))) {
    res.status(400).json({ message: "Invalid id param" });

    return;
  }

  next();
};

export default checkVetById;
