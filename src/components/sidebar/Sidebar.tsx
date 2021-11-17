import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <nav>
        <div className={`${styles.link} ${styles.active}`}>
          <i className="bi bi-motherboard" />
        </div>
        <div className={styles.toggle}>
          <i className="bi bi-motherboard" />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
