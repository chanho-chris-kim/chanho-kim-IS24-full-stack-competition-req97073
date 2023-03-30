import styles from "../styles/Home.module.css";
import Image from "next/image";
import uniqid from "uniqid";
import editIcon from "../public/edit.svg";
import deleteIcon from "../public/delete.svg";
import { useState } from "react";
import { Interface } from "readline";

interface FormData {
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  methodology: string;
}

interface Products {
  product: {
    productId: string;
    productName: string;
    productOwnerName: string;
    Developers: JSON;
    scrumMasterName: string;
    startdate: Date;
    methodology: string;
  }[];
}

function DataTable({ products }: Products) {
  const URL = "http://localhost:3000/api/product";
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [form, setForm] = useState<FormData>({
    productName: "",
    productOwnerName: "",
    Developers: selectedDevelopers,
    scrumMasterName: "",
    methodology: "",
  });

  async function addProduct(data: FormData) {
    try {
      fetch(URL, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({
          productName: "",
          productOwnerName: "",
          Developers: "",
          scrumMasterName: "",
          methodology: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      fetch(`${URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      addProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectingDevelopers = (e) => {
    if (selectedDevelopers.length < 5) {
      setSelectedDevelopers([...selectedDevelopers, e.target.value]);
    } else {
      console.log("exceeded 5");
    }
  };
  console.log(form.Developers);

  return (
    <>
      <h1>IMB Database</h1>
      <div>
        <h1>Products</h1>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(form);
            handleSubmit(form);
          }}
        >
          <textarea
            placeholder="productName"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
          />
          <label>
            Product Owner Name:
            <select
              value={form.productOwnerName}
              onChange={(e) =>
                setForm({ ...form, productOwnerName: e.target.value })
              }
            >
              <option value=""></option>
              <option value="Lisa">Lisa</option>
              <option value="Alan">Alan</option>
              <option value="Michael">Michael</option>
              <option value="Frankie">Frankie</option>
              <option value="Jason">Jason</option>
              <option value="Hassan">Hassan</option>
              <option value="Hanna">Hanna</option>
              <option value="Vincent">Vincent</option>
              <option value="Cornelia">Cornelia</option>
              <option value="Anna">Anna</option>
              <option value="Katie">Katie</option>
            </select>
          </label>
          <label>
            Developers:
            <select
              value={[form.selectedDevelopers]}
              onChange={(e) => handleSelectingDevelopers(e)}
            >
              <option value=""></option>
              <option value="Alan">Alan</option>
              <option value="Michael">Michael</option>
              <option value="Frankie">Frankie</option>
              <option value="Jason">Jason</option>
              <option value="Hassan">Hassan</option>
              <option value="Hanna">Hanna</option>
              <option value="Vincent">Vincent</option>
              <option value="Cornelia">Cornelia</option>
              <option value="Anna">Anna</option>
              <option value="Katie">Katie</option>
            </select>
          </label>
          <div className={styles.selected_developers}>
            {selectedDevelopers.map((selectedDeveloper) => (
              <p key={uniqid()}>{selectedDeveloper}</p>
            ))}
          </div>
          <label>
            Scrum Master Name:
            <select
              value={form.scrumMasterName}
              onChange={(e) =>
                setForm({ ...form, scrumMasterName: e.target.value })
              }
            >
              <option value=""></option>
              <option value="Lisa">Lisa</option>
            </select>
          </label>
          <label>
          Methodology:
            <select
              value={form.methodology}
              onChange={(e) =>
                setForm({ ...form, methodology: e.target.value })
              }
            >
              <option value=""></option>
              <option value="Waterfall">Waterfall</option>
              <option value="Agile">Agile</option>
            </select>
          </label>
          <button type="submit">Add +</button>
        </form>
      </div>

      <div className={styles.table_div}>
        <table className={styles.data_table}>
          <thead>
            <tr className={styles.th}>
              <th></th>
              <th>Product Number</th>
              <th>Product</th>
              <th>Product Owner</th>
              <th>Developers</th>
              <th>Scrum Master</th>
              <th>Start Date</th>
              <th>Methodology</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.productId}>
                  <td className={styles.td}>
                    <Image
                      src={editIcon}
                      alt="edit"
                      width={20}
                      className={styles.icon}
                      // onClick={() => handleEdit(product.productId)}
                    />
                    <Image
                      src={deleteIcon}
                      alt="edit"
                      width={20}
                      className={styles.icon}
                      // onClick={() => handleDelete(product.productId)}
                    />
                  </td>
                  <td className={styles.td}>{product.productId}</td>
                  <td className={styles.td}>{product.productName}</td>
                  <td className={styles.td}>{product.productOwnerName}</td>
                  <td className={styles.td}>
                    {JSON.parse(product.Developers).map((developer) => {
                      return <p key={uniqid()}>{developer}</p>;
                    })}
                  </td>
                  <td className={styles.td}>{product.scrumMasterName}</td>
                  <td className={styles.td}>{product.startDate}</td>
                  <td className={styles.td}>{product.methodology}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
