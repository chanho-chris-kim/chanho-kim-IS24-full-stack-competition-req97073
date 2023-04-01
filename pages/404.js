import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";

function Custom404() {
  return (
    <>
      <Navbar />
      <div className={styles.four_oh_four_page}>
        <h1>404 - Page Not Found</h1>
        <p>Please verify URL</p>
        <div className={styles.button}>
          <Link href="/" className={styles.a_tag}>
            Homepage
          </Link>
        </div>
      </div>
    </>
  );
}

export default Custom404;
