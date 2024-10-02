import { Router } from "express";
import {
  DeleteVetById,
  GetAllVets,
  GetVetById,
  UpdateVetById,
  createNewVet,
  loginVet,
} from "../controllers/vet.controllers.js";
import { body,param } from "express-validator";
import ValidateDataMiddleware from "../Middlewares/validation/ValidateData.middleware.js";
import authorizateVet from "../Middlewares/vets/authorizateVet.js";
import vetExists from "../Middlewares/vets/vetExist.js";
import checkVetById from "../Middlewares/vets/checkVetById.js";

const vetsRoutes = Router();

// Ruta para obtener todos los vets
vetsRoutes.get("/", GetAllVets);

// Ruta para obtener un usuario por ID
vetsRoutes.get("/:id",[
  param('id', 'id is required').notEmpty(),
  body('id', "id can't be modified").isEmpty(),
  body("namevet", "namevet not valid").exists().isString(),
  body("password", "password invalid").exists().isString().isLength({
    min: 1,
    max: 10,
  }),
    ValidateDataMiddleware
], GetVetById);

// Ruta para login
vetsRoutes.post("/login",
  body("namevet", "namevet not valid").exists().isString(),
  body("password", "password invalid").exists().isString().isLength({
    min: 1,
    max: 10,
  }),
  ValidateDataMiddleware, loginVet);

vetsRoutes.post(
  "/",
  [
    body("namevet", "namevet not valid").exists().isString(),
    body("password", "password invalid").exists().isString().isLength({
      min: 1,
      max: 10,
    }),
    ValidateDataMiddleware,
  ],
  createNewVet
);

// Ruta para modificar un usuario por ID
vetsRoutes.patch("/:id", [vetExists,checkVetById,authorizateVet,
  param('id', 'id is required').notEmpty(),
  body('id', "id can't be modified").isEmpty(),
  body("namevet", "namevet not valid").exists().isString(),
  body("password", "password invalid").exists().isString().isLength({
    min: 1,
    max: 10,
  }),
    ValidateDataMiddleware
], UpdateVetById);

// Ruta para eliminar un usuario por ID
vetsRoutes.delete("/:id", [vetExists,checkVetById,
  authorizateVet, 
  param('id', 'id is required').notEmpty(),
  body('id', "id can't be modified").isEmpty(),
  body("namevet", "namevet not valid").exists().isString(),
  body("password", "password invalid").exists().isString().isLength({
    min: 1,
    max: 10,
  }),
    ValidateDataMiddleware
  ], DeleteVetById);

export default vetsRoutes;
