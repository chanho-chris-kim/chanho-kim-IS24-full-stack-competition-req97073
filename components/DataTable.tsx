import styles from "../styles/Home.module.css";
import Image from "next/image";
import uniqid from "uniqid";
import editIcon from "../public/edit.svg";
import deleteIcon from "../public/delete.svg";
import { useRouter } from "next/router";

// ************************ INTERFACE ****************************

function DataTable({ products, handleEditClick, setIsOpenAdd }: any) {
  const URL = "http://localhost:3000/api/product";
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

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

  return (
    <>
      <h1>IMB Database</h1>
      <h1>Products</h1>
      <div className={styles.add}>
        <p
          className={styles.add_text}
          onClick={() => setIsOpenAdd(true)}
        >
          Add
        </p>
      </div>

      <div className={styles.table_div}>
        <table className={styles.data_table}>
          <thead>
            <tr className={styles.th}>
              <th></th>
              <th>Product Number</th>
              <th>Product total: {products.length}</th>
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
                      onClick={() => handleEditClick(product.productId)}
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
