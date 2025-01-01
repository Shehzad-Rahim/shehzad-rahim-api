import Image, { StaticImageData } from "next/image";

interface ProductType {
    id : number;
    name: string;
    imagePath : string | StaticImageData;
    description : string;
    price : number;
    full_price : number;
    discount : string;
}
async function fetchProdct() : Promise<ProductType[]>{
    const response = await fetch('http://localhost:3000/product.json')
    const data = await response.json();
    return data.product
}
async function page() {
    const product = await fetchProdct()
  return (
    <div className="flex flex-wrap justify-center gap-10 p-10">
        {product.map((product) => {
            return (
                <div className="w-[300px] border py-2 px-4" key={product.id}>
                    <Image className="w-[100%]"  src={product.imagePath} alt={product.name} width={100} height={100}></Image>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Full Price: {product.full_price}</p>
                    <p>Discount: {product.discount}</p>
                </div>
            )
        })}
    </div>
  )
}

export default page