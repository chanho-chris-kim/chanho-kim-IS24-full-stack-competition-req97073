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
  console.log(products);
  return <Layout products={products} />;
}

export async function getServerSideProps() {
  const productRes = await axios
    .get("http://localhost:3000/api/product")
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  const products = await productRes.data;
  return {
    props: { products },
  };
}
