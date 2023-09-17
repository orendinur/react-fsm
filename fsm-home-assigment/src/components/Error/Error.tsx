import styles from "./Error.module.css";

// Displays an error message when a network call goes wrong.

export const Error = () => {
  return (
    <div className={styles.error}>
      <div className={styles.text}>
        <p>Oops... something went wrong</p>
      </div>
    </div>
  );
};
