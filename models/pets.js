import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Pets = dbConnection.define("pets", {
  namepet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerpet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typePet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Pets.sync();
export default Pets;
