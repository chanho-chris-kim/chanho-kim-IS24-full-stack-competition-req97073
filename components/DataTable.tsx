import styles from "../styles/Home.module.css";
import Image from "next/image";
import uniqid from "uniqid";
import editIcon from "../public/edit.svg";
import deleteIcon from "../public/delete.svg";

function DataTable({
  dataForDisplay,
  handleEditClick,
  handleDeleteClick,
}: any) {
  return (
    <>
      <div className={styles.table_div}>
        <table className={styles.data_table}>
          <thead>
            <tr className={styles.th}>
              <th></th>
              <th>Product Number</th>
              <th>Product total: {dataForDisplay.length}</th>
              <th>Product Owner</th>
              <th>Developers</th>
              <th>Scrum Master</th>
              <th>Start Date</th>
              <th>Methodology</th>
            </tr>
          </thead>
          <tbody>
            {dataForDisplay.map((product: any) => {
              return (
                <tr key={product.productId}>
                  <td className={styles.td}>
                    {/* passing id that user clicks to triger isOpenEdit to display EditModal.tsx*/}
                    <Image
                      src={editIcon}
                      alt="edit"
                      width={20}
                      className={styles.icon}
                      onClick={() => handleEditClick(product.productId)}
                    />

                    {/* passing id that user clicks to triger isOpenDelete to display DeleteModal.tsx*/}
                    <Image
                      src={deleteIcon}
                      alt="delete"
                      width={20}
                      className={styles.icon}
                      onClick={() => handleDeleteClick(product.productId)}
                    />
                  </td>
                  <td className={styles.td}>{product.productId}</td>
                  <td className={`${styles.td} ${styles.product_name}`}>{product.productName}</td>
                  <td className={styles.td}>{product.productOwnerName}</td>
                  <td className={styles.td}>
                    {JSON.parse(product.Developers).map((developer: any) => {
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
