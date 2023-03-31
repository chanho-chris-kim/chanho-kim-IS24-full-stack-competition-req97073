import axios from "axios";
import Layout from "@/components/Layout";

interface Products {
  products: {
    productId: string;
    productName: string;
    productOwnerName: string;
    Developers: JSON;
    scrumMasterName: string;
    startdate: Date;
    methodology: string;
  }[];
}

export default function Home({ products }: Products) {
  return <Layout products={products} />;
}

export async function getServerSideProps() {
  const productRes = await axios
    .get("http://localhost:3000/api/product")
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  const products = await productRes.data;
  return {
    props: { products },
  };
}
