import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Owners = dbConnection.define("owners", {
  nameowner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Owners.sync();
export default Owners;
