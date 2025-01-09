import { NextApiRequest, NextApiResponse } from 'next';
const products = [
    {
        id: 1,
        name : "The Dandy Chair",
        price : 250,
        inStock: true,
    },
    {
        id: 2,
        name : "Rustic Vase Set",
        price : 155,
        inStock: true,
    },
    {
        id: 3,
        name : "The Silky Vase",
        price : 125,
        inStock: true,
    },
    {
        id: 4,
        name : "The Lucy Lamp",
        price : 250,
        inStock: true,
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            res.status(200).json(products);
            break;
        case "POST":
            const newProduct = { id: products.length + 1, ...req.body };
            products.push(newProduct);
            res.status(201).json(newProduct);
            break;
        case "PUT":
            const { id } = req.query;
            if (typeof id === "string") {
                const productIndex = products.findIndex((p) => p.id === parseInt(id));
                if (productIndex !== -1) {
                    products[productIndex] = { ...products[productIndex], ...req.body };
                    res.status(200).json(products[productIndex]);
                } else {
                    res.status(404).json({ message: "Product not found" });
                }
            } else {
                res.status(400).json({ message: "Invalid product ID" });
            }
            break;
        case "DELETE":
            const deleteId = req.query.id;
            if (typeof deleteId === "string") {
                const deleteIndex = products.findIndex((p) => p.id === parseInt(deleteId));
                if (deleteIndex !== -1) {
                    const deleteProduct = products.splice(deleteIndex, 1);
                    res.status(200).json(deleteProduct);
                } else {
                    res.status(404).json({ message: "Product not found" });
                }
            } else {
                res.status(400).json({ message: "Invalid product ID" });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
