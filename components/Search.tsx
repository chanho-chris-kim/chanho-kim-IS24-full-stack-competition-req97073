import styles from "../styles/Home.module.css";

function Search({
  isOpenSearch,
  setIsOpenSearch,
  handleSearchInput,
  searchQuery,
  setSearchQuery
}: any) {
  return (
    <>
      <div className={styles.search_bar}>
        <h3>Search by</h3>
        <div className={styles.buttons}>
          <div
            className={styles.button}
            onClick={() => {
              setIsOpenSearch("scrum_master");
            }}
          >
            <p>Scrum Master</p>
          </div>
          <div
            className={styles.button}
            onClick={() => {
              setIsOpenSearch("developer_name");
            }}
          >
            <p>Developer Name</p>
          </div>
        </div>

        {/* search input displays when button is clicked */}
        {isOpenSearch != "" ? (
          <input
            type="text"
            placeholder={isOpenSearch}
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value); //changing searchQuery value lively to display the input tag value
                handleSearchInput(e.target.value.toLowerCase(), isOpenSearch)}} //passing the value (in low case) and the type that user wants to search for
          />
        ) 
        : //if user didn't select any of the buttons display nothing
        (
          <></>
        )}
      </div>
    </>
  );
}

export default Search;
