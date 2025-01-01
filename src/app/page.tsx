import Link from "next/link";

export default function Home() {
  return (
   <div className="flex justify-center items-center h-[100vh]">
    <Link className="text-2xl py-6 px-4 border rounded-lg" href={'/product'}>Go to Products Page</Link>
   </div>
  );
}
