import { Guitar } from "../models/Guitar.js";

const requiredFields = ["name", "image", "description", "price"];

const validateGuitar = (body) => {
    const errors = [];

    for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === null || String(body[field]).trim() === "") {
            errors.push(`${field} es obligatorio`);
        }
    }

    if (body.price !== undefined && (typeof body.price !== "number" || !Number.isFinite(body.price) || body.price < 0)) {
        errors.push("price debe ser un número mayor o igual a 0");
    }

    return errors;
};

export const getGuitars = async (_request, response, next) => {
    try {
        const guitars = await Guitar.findAll({ order: [["id", "ASC"]] });
        response.json(guitars);
    } catch (error) {
        next(error);
    }
};

export const createGuitar = async (request, response, next) => {
    try {
        const errors = validateGuitar(request.body);
        if (errors.length > 0) {
            response.status(400).json({ message: "Datos inválidos", errors });
            return;
        }

        const guitar = await Guitar.create({
            name: request.body.name.trim(),
            image: request.body.image.trim(),
            description: request.body.description.trim(),
            price: request.body.price,
        });

        response.status(201).json(guitar);
    } catch (error) {
        next(error);
    }
};
