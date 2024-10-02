import Vets from "../models/vets.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Controlador para obtener todos los pets
export const GetAllVets = async (req, res) => {
  const vets = await Vets.findAll();

  res.json(vets);
};

// Controlador para obtener los pets por ID
export const GetVetById = async (req, res) => {
  const vets = await Vets.findOne({
    where: { id: +req.params.id },
  });

  res.json(vets);
};

// Controlador para crear un owner
export const createNewVet = async (req, res) => {
  const userToCreate = req.body;

  await Vets.create(userToCreate);

  res.status(201).json(userToCreate);
};

// Controlador para autorización
export const loginVet = async (req, res) => {
  const { namevet, password } = req.body;

  try {
    // Buscar el veterinario por su nombre
    const vet = await Vets.findOne({
      where: {
        namevet: namevet,
      },
    });

    // Si no se encuentra el veterinario
    if (!vet) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verificar la contraseña usando bcrypt
    const Match = await bcryptjs.compare(password, vet.password);
    if (!Match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generar el token si las credenciales son válidas
    const token = jwt.sign({ vetId: vet.id }, "TokenVet", {
      expiresIn: 60 * 60, // 1 hora
    });

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controlador para actualizar un pet
export const UpdateVetById = async (req, res) => {
  await Vets.update(req.body, {
    where: {
      id: +req.params.id,
    },
  });

  const vetUpdated = await Vets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  res.json(vetUpdated);
};

// Controlador para eliminar un pet por ID
export const DeleteVetById = async (req, res) => {
  const VetToDelete = await Vets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  await Vets.destroy({
    where: {
      id: +req.params.id,
    },
  });
  res.json(VetToDelete);
};
