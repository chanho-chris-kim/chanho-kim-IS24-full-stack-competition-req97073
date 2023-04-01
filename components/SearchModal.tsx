import styles from "../styles/Home.module.css";
import uniqid from "uniqid";
import { useState } from "react";

function SearchModal({ products, isOpenSearch, setIsOpenSearch }: any) {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [dataForDisplay, setDataForDisplay] = useState(products);
  const [searchBy, setSearchBy] = useState<number>();

  async function handleSearchInput(input: string, searchBy: number) {
    if (searchBy == 1) {
      const filteredData: any = products.filter((product: any) => {
        return product.scrumMasterName.includes(input);
      });
      setDataForDisplay(filteredData);
    } else if (searchBy == 2) {
      const filteredData: any = products.filter((product: any) => {
        return product.Developers.includes(input);
      });
      setDataForDisplay(filteredData);
    }
  }
  if (isOpenSearch) {
    return (
      <>
        <div className={styles.modal_background}>
          <div className={styles.modal_div_search}>
            <div className={styles.align_right}>
              <div
                className={styles.button}
                onClick={() => {
                  setIsOpenSearch(false);
                  setSearchQuery("");
                  setSearchBy(null);
                }}
              >
                <p>x</p>
              </div>
            </div>
            <div className={styles.search_bar}>
              <h3>Search by: </h3>
              <div className={styles.buttons}>
                <div
                  className={styles.button}
                  onClick={() => {
                    setSearchBy(1);
                  }}
                >
                  <p>Scrum Master</p>
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    setSearchBy(2);
                  }}
                >
                  <p>Developer Name</p>
                </div>
              </div>
              {searchBy ? (
                <input
                  autoFocus
                  className={styles.search_input}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearchInput(e.target.value.toLowerCase(), searchBy);
                  }}
                />
              ) : null}
            </div>
            {dataForDisplay ? (
              <div className={styles.table_div}>
                <table className={styles.data_table}>
                  <thead>
                    <tr className={styles.th}>
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
                          <td className={styles.td}>{product.productId}</td>
                          <td className={`${styles.td} ${styles.product_name}`}>
                            {product.productName}
                          </td>
                          <td className={styles.td}>
                            {product.productOwnerName}
                          </td>
                          <td className={styles.td}>
                            {JSON.parse(product.Developers).map(
                              (developer: string) => {
                                return <p key={uniqid()}>{developer}</p>;
                              }
                            )}
                          </td>
                          <td className={styles.td}>
                            {product.scrumMasterName}
                          </td>
                          <td className={styles.td}>{product.startDate}</td>
                          <td className={styles.td}>{product.methodology}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  } else {
    null;
  }
}

export default SearchModal;
