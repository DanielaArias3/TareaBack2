import Pets from "../models/pets.js";

// Controlador para obtener todos los pets
export const GetAllPets = async (req, res) => {
  const petsKey = await Pets.findAll();
  res.json(petsKey);
};
// Controlador para obtener los pets por ID
export const GetPetById = async (req, res) => {
  const pets = await Pets.findOne({
    where: { id: +req.params.id },
  });

  res.json(pets);
};

// Controlador para crear un pets
export const createNewPet = async (req, res) => {
  const petToCreate = req.body;

  await Pets.create(petToCreate);

  res.status(201).json(petToCreate);
};

// Controlador para actualizar un pet
export const UpdatePetById = async (req, res) => {
  await Pets.update(req.body, {
    where: {
      id: +req.params.id,
    },
  });

  const petUpdated = await Pets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  res.json(petUpdated);
};

// Controlador para eliminar un pet por ID
export const DeletePetById = async (req, res) => {
  const petToDelete = await Pets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  await Pets.destroy({
    where: {
      id: +req.params.id,
    },
  });
  res.json(petToDelete);
};
