import { Router } from "express";
import {
  DeleteOwnerById,
  GetOwnerById,
  UpdateOwnerById,
  createNewOwner,
  login,
} from "../controllers/owners.controllers.js";
import { body, param } from "express-validator";
import authorizateOwner from "../Middlewares/owners/authorizateOwner.js";
import checkOwnerById from "../Middlewares/owners/checkOwnerById.js";
import ownerExists from "../Middlewares/owners/ownerExist.js";
import ValidateDataMiddleware from "../Middlewares/validation/ValidateData.middleware.js";

const ownersRoutes = Router();

// Ruta para obtener un usuario por ID
ownersRoutes.get("/:id",GetOwnerById);

// Ruta para crear un owner
ownersRoutes.post(
  "/",
  [
    body("nameowner", "nameowner not valid").exists().isString().notEmpty(),
    body("password", "password invalid").exists().isAlphanumeric().isLength({
      min: 1,
      max: 10,
    }).notEmpty,
    ValidateDataMiddleware,
  ],
  createNewOwner
);

// Ruta para login
ownersRoutes.post("/login",
  [
    body("nameowner", "nameowner not valid").exists().isString().notEmpty(),
    body("password", "password invalid").exists().isAlphanumeric().isLength({
      min: 1,
      max: 10,
    }),
    ValidateDataMiddleware,
  ], login);

// Ruta para modificar un usuario por ID
ownersRoutes.patch("/:id",[ownerExists,checkOwnerById,authorizateOwner,
  param('id', 'id is required').notEmpty(),
  body('id', "id can't be modified").isEmpty(),
  body("nameowner", "nameowner not valid").exists().isString().notEmpty(),
  body("password", "password invalid").exists().isAlphanumeric().isLength({
      min: 1,
      max: 10,
    }),
    ValidateDataMiddleware
], UpdateOwnerById);

// Ruta para eliminar un usuario por ID
ownersRoutes.delete("/:id", [ownerExists,checkOwnerById,authorizateOwner,
  param('id', 'id is required').notEmpty(),
  body('id', "id can't be modified").isEmpty(),
    ValidateDataMiddleware
], DeleteOwnerById);

export default ownersRoutes;
