import uniqid from "uniqid";
import styles from "../styles/Home.module.css";

function EditModal({
  refreshData,
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
        setFormConditioning();
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
      <>
        <div className={styles.modal_background}>
          <div className={styles.modal_div}>
            <div className={styles.align_right}>
              <div
                className={styles.button}
                onClick={() => {
                  setIsOpen(false);
                  setFormConditioning();
                  setEditData(null);
                }}
              >
                <p>x</p>
              </div>
            </div>
            <h2 className={styles.h2}>Edit</h2>
            <p className={styles.form_condition}>{formConditioning}</p>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit(editData);
              }}
            >
              <p className={styles.product_name}>
                Product Number: {editData.productId}
              </p>
              <div className={styles.input}>
                <label className={styles.display_column}>
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
              </div>
              <div className={styles.input}>
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
                    <option value="" disabled></option>
                    <option value="lisa">Lisa</option>
                    <option value="alan">Alan</option>
                    <option value="michael">Michael</option>
                    <option value="frankie">Frankie</option>
                    <option value="jason">Jason</option>
                    <option value="hassan">Hassan</option>
                    <option value="jek">Jek</option>
                    <option value="vincent">Vincent</option>
                    <option value="cornelia">Cornelia</option>
                    <option value="anna">Anna</option>
                    <option value="katie">Katie</option>
                  </select>
                </label>
              </div>
              <div className={styles.input}>
                <label>
                  Developers:
                  <select
                    value={editData.Developers}
                    onChange={(e) => handleEditSelectingDevelopers(e)}
                  >
                    <option value="alan">Alan</option>
                    <option value="michael">Michael</option>
                    <option value="frankie">Frankie</option>
                    <option value="jason">Jason</option>
                    <option value="hassan">Hassan</option>
                    <option value="jek">Jek</option>
                    <option value="vincent">Vincent</option>
                    <option value="cornelia">Cornelia</option>
                    <option value="anna">Anna</option>
                    <option value="katie">Katie</option>
                  </select>
                </label>
                <div className={styles.selected_developers_box}>
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
              </div>
              <div className={styles.input}>
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
                    <option value="" disabled></option>
                    <option value="lisa">lisa</option>
                  </select>
                </label>
              </div>
              <div className={styles.input}>
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
              </div>
              <div className={styles.input}>
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
                    <option value="" disabled></option>
                    <option value="waterfall">Waterfall</option>
                    <option value="agile">Agile</option>
                  </select>
                </label>
              </div>
              <button type="submit" className={styles.button}>
                Edit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    null;
  }
}

export default EditModal;
