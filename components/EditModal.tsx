import uniqid from "uniqid";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function EditModal({
  formConditioning,
  setFormConditioning,
  isOpen,
  setIsOpen,
  editData,
  setEditData,
  selectedEditDevelopers,
  setSelectedEditDevelopers,
  deleteDeveloper,
}: any) {
  const URL = "http://localhost:3000/api/product";
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleEditSubmit = async (data: any) => {
    if (!data.productName) {
      setFormConditioning("Can't leave product name empty");
      return;
    } else if (!data.productOwnerName) {
      setFormConditioning("Can't leave product owner name empty");
      return;
    } else if (selectedEditDevelopers.length == 0) {
      setFormConditioning("Can't leave developers empty");
      return;
    } else if (!data.scrumMasterName) {
      setFormConditioning("Can't scrum master name empty");
      return;
    } else if (!data.startDate) {
      setFormConditioning("Can't leave start date empty");
      return;
    } else if (!data.methodology) {
      setFormConditioning("Can't leave methodology empty");
      return;
    } else {
      try {
        editProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function editProduct(data: any) {
    try {
      fetch(`${URL}/${data.productId}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then(() => {
        setFormConditioning()
        setEditData(null);
        setIsOpen(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditSelectingDevelopers = (e: any) => {
    if (selectedEditDevelopers.includes(e.target.value)) {
      return;
    } else if (selectedEditDevelopers.length < 5) {
      setSelectedEditDevelopers((prev: any) => [...prev, e.target.value]);
      setEditData((prev: any) => {
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

  if (isOpen) {
    return (
      <div className={styles.modal_background}>
        <div className={styles.modal_div}>
          <div className={styles.modal}>
            {editData && (
              <div>
                <div className={styles.x} onClick={() => setIsOpen(false)}>
                  <p className={styles.x_text}>X</p>
                </div>
                <h2 className={styles.h2}>Edit</h2>
                <p className={styles.form_condition}>{formConditioning}</p>
                <form
                  className={styles.edit_form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSubmit(editData);
                  }}
                >
                  <p>Product Number: {editData.productId}</p>
                  <label>
                    Product Name:
                    <textarea
                      value={editData.productName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          productName: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Product Owner Name:
                    <select
                      value={editData.productOwnerName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          productOwnerName: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled selected></option>
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
                        <div
                          key={uniqid()}
                          className={styles.selected_developers}
                        >
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
                        setEditData({
                          ...editData,
                          scrumMasterName: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled selected></option>
                      <option value="Lisa">Lisa</option>
                    </select>
                  </label>
                  <label>
                    Start Date:
                    <input
                      type="date"
                      value={editData.startDate}
                      onChange={(e) =>
                        setEditData({ ...editData, startDate: e.target.value })
                      }
                    ></input>
                  </label>
                  <label>
                    Methodology:
                    <select
                      value={editData.methodology}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          methodology: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled selected></option>
                      <option value="Waterfall">Waterfall</option>
                      <option value="Agile">Agile</option>
                    </select>
                  </label>
                  <button type="submit" className={styles.button}>
                    Edit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    null;
  }
}

export default EditModal;
