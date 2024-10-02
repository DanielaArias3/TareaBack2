import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";
import bcryptjs from "bcryptjs";

const Vets = dbConnection.define("vets", {
  namevet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (vet) => {
      if (vet.password) {
        const salt = await bcryptjs.genSalt(10);
        vet.password = await bcryptjs.hash(vet.password, salt);
      }
    },
    beforeUpdate: async (vet) => {
      if (vet.changed('password')) {
        const salt = await bcryptjs.genSalt(10);
        vet.password = await bcryptjs.hash(vet.password, salt);
      }
    },
  }
});

Vets.sync();
export default Vets;
