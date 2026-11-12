import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Guitar = sequelize.define("Guitar", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: { notEmpty: true },
    },
    image: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: { notEmpty: true },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true },
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { isDecimal: true, min: 0 },
    },
}, {
    tableName: "guitars",
    timestamps: true,
});
