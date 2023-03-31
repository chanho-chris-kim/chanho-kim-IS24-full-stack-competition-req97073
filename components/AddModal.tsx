import styles from "../styles/Home.module.css";
import uniqid from "uniqid";
import { useRouter } from "next/router";

interface FormData {
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

function AddModal({
  dataForDisplay,
  formConditioning,
  setFormConditioning,
  isOpenAdd,
  setIsOpenAdd,
  selectedDevelopers,
  setSelectedDevelopers,
  form,
  setForm,
  deleteDeveloper,
}: any) {
  const URL = "http://localhost:3000/api/product";
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handlePostSubmit = async (data: FormData) => {
    if (!data.productName) {
      setFormConditioning("Can't leave product name empty");
      return;
    } else if (!data.productOwnerName) {
      setFormConditioning("Can't leave product owner name empty");
      return;
    } else if (selectedDevelopers.length == 0) {
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
        setForm({ ...form, Developers: selectedDevelopers });
        addProduct(data);
      } catch (error) {
        console.log(error);
      }
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
        console.log(dataForDisplay);
        setFormConditioning();
        setForm({
          productName: "",
          productOwnerName: "",
          Developers: "",
          scrumMasterName: "",
          startDate: "",
          methodology: "",
        });
        setIsOpenAdd(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectingDevelopers = (e: any) => {
    if (selectedDevelopers.includes(e.target.value)) {
      return;
    } else if (selectedDevelopers.length < 5) {
      setSelectedDevelopers((prev: any) => [...prev, e.target.value]);
      setForm((prev: any) => {
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

  if (isOpenAdd) {
    return (
      <>
        <div className={styles.modal_background}>
          <div className={styles.modal_div}>
            <div className={styles.align_right}>
              <div
                className={styles.button}
                onClick={() => {
                  setSelectedDevelopers([]);
                  setFormConditioning();
                  setForm({
                    productName: "",
                    productOwnerName: "",
                    Developers: "",
                    scrumMasterName: "",
                    startDate: "",
                    methodology: "",
                  });
                  setIsOpenAdd(false);
                }}
              >
                <p>x</p>
              </div>
            </div>
            <h2 className={styles.h2}>Add</h2>
            <p className={styles.form_condition}>{formConditioning}</p>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                handlePostSubmit(form);
              }}
            >
              <div className={styles.input}>
                <label className={styles.display_column}>
                  Product Name:
                  <textarea
                    placeholder="productName"
                    value={form.productName}
                    onChange={(e) =>
                      setForm({ ...form, productName: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className={styles.input}>
                <label>
                  Product Owner Name:
                  <select
                    value={form.productOwnerName}
                    onChange={(e) =>
                      setForm({ ...form, productOwnerName: e.target.value })
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
                    multiple
                    value={[form.Developers]}
                    onChange={(e) => handleSelectingDevelopers(e)}
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
                  {selectedDevelopers.map((selectedDeveloper: string) => (
                    <div key={uniqid()} className={styles.selected_developers}>
                      <p>{selectedDeveloper}</p>
                      <p
                        className={styles.mini_delete}
                        onClick={() => {
                          deleteDeveloper(selectedDeveloper, "add"); // to notify that the user wants to delete developer from array of developers in add modal
                        }}
                      >
                        x
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.input}>
                <label>
                  Scrum Master Name:
                  <select
                    value={form.scrumMasterName}
                    onChange={(e) =>
                      setForm({ ...form, scrumMasterName: e.target.value })
                    }
                  >
                    <option value="" disabled></option>
                    <option value="lisa">Lisa</option>
                  </select>
                </label>
              </div>
              <div className={styles.input}>
                <label>
                  Start Date:
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                  ></input>
                </label>
              </div>
              <div className={styles.input}>
                <label>
                  Methodology:
                  <select
                    value={form.methodology}
                    onChange={(e) =>
                      setForm({ ...form, methodology: e.target.value })
                    }
                  >
                    <option value="" disabled></option>
                    <option value="waterfall">Waterfall</option>
                    <option value="agile">Agile</option>
                  </select>
                </label>
              </div>
              <button type="submit" className={styles.button}>
                Add
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

export default AddModal;
