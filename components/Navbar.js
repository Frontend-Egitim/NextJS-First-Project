import styles from "./navbar.module.css";

export const Navbar = () => {
  const links = ["gündem", "blog", "iletişim"];

  return (
    <div className={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Google-flutter-logo.svg/1024px-Google-flutter-logo.svg.png"
        height={40}
      />

      <ul className={styles.list}>
        {links.map((a) => (
          <li className={styles.listItem}>{a}</li>
        ))}
      </ul>
    </div>
  );
};
