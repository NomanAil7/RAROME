import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className={styles.heading}>Welcome to the School Portal</h1>
        <p className={styles.description}>
          Manage school profiles and information easily.
        </p>

        <div className={styles.ctas}>
          <a href="/login" className={styles.primary}>
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
