import bcLogo from "../public/gov_bc_logo.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="https://www2.gov.bc.ca/gov/content/home">
        <Image
          src={bcLogo}
          alt="Province of BC Logo"
          width={175}
          // className={styles.icon}
          // onClick={() => handleEdit(product.productId)}
        />
      </Link>
    </div>
  );
}

export default Navbar;
