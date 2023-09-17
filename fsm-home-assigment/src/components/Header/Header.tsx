import styles from "./Header.module.css";

// Displays a header at the top of the app.

export const Header = () => {
  return (
    <header className={styles.title}>
      <h1>Welcome to the Books Website</h1>
    </header>
  );
};
