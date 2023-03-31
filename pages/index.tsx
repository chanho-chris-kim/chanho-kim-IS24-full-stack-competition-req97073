import axios from "axios";
import Layout from "@/components/Layout";
import EditModal from "@/components/EditModal";
import { useState } from "react";

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

interface FormData {
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

interface FormEditData {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

export default function Home({ products }: Products) {
  const URL = "http://localhost:3000/api/product";
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [form, setForm] = useState<FormData>({
    productName: "",
    productOwnerName: "",
    Developers: JSON.stringify(selectedDevelopers),
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [formConditioning, setFormConditioning] = useState<string>();
  const [editData, setEditData] = useState<FormEditData>();
  const [selectedEditDevelopers, setSelectedEditDevelopers] = useState([]);

  async function handleEditClick(id: string) {
    const foundData: any = products.find((product: any) => {
      return id === product.productId;
    });

    if (foundData) {
      setEditData(foundData);
      setSelectedEditDevelopers(JSON.parse(foundData.Developers));
      setIsOpen(true);
    } else {
      console.log("no found data for editing");
    }
  }
  const deleteDeveloper = (name: string, itsFor: string) => {
    if(itsFor=="add"){
      const newSeletedDevelopers = selectedDevelopers.reduce(
        (p:any, c:any) => (c != name && p.push(c), p),
        []
      );
      setSelectedDevelopers(newSeletedDevelopers);
      setForm((prev: any) => {
        return {
          ...prev,
          Developers: JSON.stringify(newSeletedDevelopers),
        };
      });
    } else{
      const newSeletedDevelopers = selectedEditDevelopers.reduce(
        (p: any, c: any) => (c != name && p.push(c), p),
        []
      );
      setSelectedEditDevelopers(newSeletedDevelopers);
      setEditData((prev: any) => {
        return {
          ...prev,
          Developers: JSON.stringify(newSeletedDevelopers),
        };
      });
    }
    
  };
  return (
    <Layout
      products={products}
      selectedDevelopers={selectedDevelopers}
      setSelectedDevelopers={setSelectedDevelopers}
      formConditioning={formConditioning}
      setFormConditioning={setFormConditioning}
      form={form}
      setForm={setForm}
      isOpenAdd={isOpenAdd}
      setIsOpenAdd={setIsOpenAdd}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      editData={editData}
      setEditData={setEditData}
      selectedEditDevelopers={selectedEditDevelopers}
      setSelectedEditDevelopers={setSelectedEditDevelopers}
      handleEditClick={handleEditClick}
      deleteDeveloper={deleteDeveloper}
    />
  );
}

export async function getServerSideProps() {
  const productRes:any = await axios
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
