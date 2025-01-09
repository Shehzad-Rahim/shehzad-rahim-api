import { NextResponse } from "next/server";

const products = [
    {
        id: 1,
        name: "The Dandy Chair",
        price: 250,
        inStock: true,
    },
    {
        id: 2,
        name: "Rustic Vase Set",
        price: 155,
        inStock: true,
    },
    {
        id: 3,
        name: "The Silky Vase",
        price: 125,
        inStock: true,
    },
    {
        id: 4,
        name: "The Lucy Lamp",
        price: 250,
        inStock: true,
    },
];

// Handle GET requests
export async function GET() {
    return NextResponse.json(products);
}

// Handle POST requests
export async function POST(request: Request) {
    const body = await request.json();
    const newProduct = { id: products.length + 1, ...body };
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}

// Handle PUT requests
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex !== -1) {
        const body = await request.json();
        products[productIndex] = { ...products[productIndex], ...body };
        return NextResponse.json(products[productIndex]);
    }

    return NextResponse.json({ message: "Product not found" }, { status: 404 });
}

// Handle DELETE requests
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const deleteIndex = products.findIndex((p) => p.id === parseInt(id));
    if (deleteIndex !== -1) {
        const [deletedProduct] = products.splice(deleteIndex, 1);
        return NextResponse.json(deletedProduct);
    }

    return NextResponse.json({ message: "Product not found" }, { status: 404 });
}
