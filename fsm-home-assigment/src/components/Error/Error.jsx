import styles from "./Error.module.css";

export const Error = () => {
  return (
    <div className={styles.error}>
      <div className={styles.text}>
        <p>Oops... something went wrong</p>
      </div>
    </div>
  );
};
