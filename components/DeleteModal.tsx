import styles from "../styles/Home.module.css";

function DeleteModal({
  refreshData,
  isOpenDelete,
  setIsOpenDelete,
  deleteId,
  setDeleteId,
}: any) {
  const URL = "http://localhost:3000/api/product";

  async function deleteProduct(deleteId: string) {
    try {
      fetch(`${URL}/${deleteId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        setIsOpenDelete(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (isOpenDelete) {
    return (
      <>
      <div className={styles.modal_background}>
        <div className={styles.modal_div}>
          <div className={styles.modal}>
            <div className={styles.align_right}>
              <div
                className={styles.button}
                onClick={() => setIsOpenDelete(false)}
              >
                <p>x</p>
              </div>
            </div>
            <h2 className={styles.h2}>Delete</h2>
            <p>Are you sure you want to delete the following?</p>
            <p>Product number: {deleteId}</p>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <p
                  onClick={() => {
                    deleteProduct(deleteId);
                  }}
                >
                  Yes
                </p>
              </div>
              <div className={styles.button}>
                <p
                  onClick={() => {
                    setDeleteId("");
                    setIsOpenDelete(false);
                  }}
                >
                  No
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  } else {
    null;
  }
}

export default DeleteModal;
