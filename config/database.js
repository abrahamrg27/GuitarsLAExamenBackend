import "dotenv/config";
import { Sequelize } from "sequelize";

const databaseUrl = process.env.DATABASE_URL;

export const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, {
        dialect: "postgres",
        logging: false,
        dialectOptions: process.env.NODE_ENV === "production"
            ? { ssl: { require: true, rejectUnauthorized: false } }
            : undefined,
    })
    : new Sequelize(
        process.env.DB_NAME || "guitarsla",
        process.env.DB_USER || "postgres",
        process.env.DB_PASSWORD || "",
        {
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT || 5432),
            dialect: "postgres",
            logging: false,
        },
    );
