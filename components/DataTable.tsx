import styles from "../styles/Home.module.css";
import Image from "next/image";
import uniqid from "uniqid";
import editIcon from "../public/edit.svg";
import deleteIcon from "../public/delete.svg";
import { useState } from "react";
import { useRouter } from "next/router";

// ************************ INTERFACE ****************************
interface FormData {
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  methodology: string;
}

interface FormEditData {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  methodology: string;
}

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

function DataTable({ products }: Products) {
  const URL = "http://localhost:3000/api/product";
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // ************************ USESTATE ****************************
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [selectedEditDevelopers, setSelectedEditDevelopers] = useState([]);
  const [form, setForm] = useState<FormData>({
    productName: "",
    productOwnerName: "",
    Developers: JSON.stringify(selectedDevelopers),
    scrumMasterName: "",
    methodology: "",
  });
  const [editData, setEditData] = useState<FormEditData>();

  // ************************ POST ****************************
  const handlePostSubmit = async (data: FormData) => {
    try {
      setForm({ ...form, Developers: selectedDevelopers });
      addProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ************************ EDIT ****************************
  const handleEditClicked = async (id: string) => {
    const foundData = products.find((product) => {
      return id === product.productId;
    });
    if (foundData) {
      setEditData(foundData);
      console.log(foundData);
      setSelectedEditDevelopers(JSON.parse(foundData.Developers));
      console.log(selectedEditDevelopers);
    } else {
      console.log("no matching found data for edit");
    }
  };

  const handleEditSubmit = async (data: FormEditData) => {
    try {
      editProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function editProduct(data: FormEditData) {
    try {
      fetch(`${URL}/${data.productId}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then(() => {
        setEditData(null);
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ************************ DELETE ****************************
  async function deleteProduct(id: string) {
    try {
      fetch(`${URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ************************ HANDLE DEVELOPERS ****************************
  const handleSelectingDevelopers = (e) => {
    if (selectedDevelopers.includes(e.target.value)) {
      return;
    } else if (selectedDevelopers.length < 5) {
      setSelectedDevelopers((prev) => [...prev, e.target.value]);
      setForm((prev) => {
        const developers = JSON.parse(prev.Developers);
        return {
          ...prev,
          Developers: JSON.stringify([...developers, e.target.value]),
        };
      });
    } else {
      console.log("exceeded 5");
    }
  };

  const handleEditSelectingDevelopers = (e: any) => {
    if (selectedEditDevelopers.includes(e.target.value)) {
      return;
    } else if (selectedEditDevelopers.length < 5) {
      setSelectedEditDevelopers((prev) => [...prev, e.target.value]);
      setEditData((prev) => {
        const developers = JSON.parse(prev.Developers);
        return {
          ...prev,
          Developers: JSON.stringify([...developers, e.target.value]),
        };
      });
    } else {
      console.log("exceeded 5");
    }
  };

  const deleteDeveloper = (name: string, itsFor: string) => {
    console.log(selectedDevelopers);
    if (itsFor === "add") {
      const newSeletedDevelopers = selectedDevelopers.reduce(
        (p, c) => (c != name && p.push(c), p),
        []
      );
      setSelectedDevelopers(newSeletedDevelopers);
    } else {
      const newSeletedDevelopers = selectedEditDevelopers.reduce(
        (p, c) => (c != name && p.push(c), p),
        []
      );
      setSelectedEditDevelopers(newSeletedDevelopers);
      setEditData((prev) => {
        return {
          ...prev,
          Developers: JSON.stringify(newSeletedDevelopers),
        };
      });
    }
  };

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
            handlePostSubmit(form);
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
              multiple
              value={[form.Developers]}
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
          <div className={styles.selected_developers_box}>
            {selectedDevelopers.map((selectedDeveloper) => (
              <div key={uniqid()} className={styles.selected_developers}>
                <p>{selectedDeveloper}</p>
                <p
                  className={styles.mini_delete}
                  onClick={() => {
                    deleteDeveloper(selectedDeveloper, "add");
                  }}
                >
                  x
                </p>
              </div>
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
          <button type="submit" className={styles.button}>
            Add +
          </button>
        </form>
      </div>
      {editData && (
        <div>
          <h2>Edit</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              console.log(editData);
              handleEditSubmit(editData);
            }}
          >
            <textarea
              value={editData.productName}
              onChange={(e) =>
                setEditData({ ...editData, productName: e.target.value })
              }
            />
            <label>
              Product Owner Name:
              <select
                value={editData.productOwnerName}
                onChange={(e) =>
                  setEditData({ ...editData, productOwnerName: e.target.value })
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
                value={editData.Developers}
                onChange={(e) => handleEditSelectingDevelopers(e)}
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
              {selectedEditDevelopers.map((developer: string) => {
                return (
                  <div key={uniqid()} className={styles.selected_developers}>
                    <p>{developer}</p>
                    <p
                      className={styles.mini_delete}
                      onClick={() => {
                        deleteDeveloper(developer, "edit");
                      }}
                    >
                      x
                    </p>
                  </div>
                );
              })}
            </div>
            <label>
              Scrum Master Name:
              <select
                value={editData.scrumMasterName}
                onChange={(e) =>
                  setEditData({ ...editData, scrumMasterName: e.target.value })
                }
              >
                <option value=""></option>
                <option value="Lisa">Lisa</option>
              </select>
            </label>
            <label>
              Methodology:
              <select
                value={editData.methodology}
                onChange={(e) =>
                  setEditData({ ...editData, methodology: e.target.value })
                }
              >
                <option value=""></option>
                <option value="Waterfall">Waterfall</option>
                <option value="Agile">Agile</option>
              </select>
            </label>
            <button type="submit" className={styles.button}>
              Add +
            </button>
          </form>
        </div>
      )}

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
                      onClick={() => handleEditClicked(product.productId)}
                    />
                    <Image
                      src={deleteIcon}
                      alt="delete"
                      width={20}
                      className={styles.icon}
                      onClick={() => deleteProduct(product.productId)}
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
