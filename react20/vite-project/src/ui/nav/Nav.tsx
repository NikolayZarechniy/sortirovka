import styles from "./nav.module.css"

type PageName = "home" | "works" | "example" | "notifications" | "task";

type NavProps = {
    active: PageName,
    setPage: (name: PageName) => void
}

export default function Nav(props: NavProps) {
    function computeStyle(page: PageName) {
        return `${styles.link} ${props.active === page ? styles.active : ""}`
    }

    return(
        <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <span className={computeStyle("home")}
             onClick={() => props.setPage("home")}>Home</span>
          </li>
          <li>
            <span className={computeStyle("works")}
             onClick={() => props.setPage("works")}>Works</span>
          </li>
          <li>
            <span className={computeStyle("example")}
             onClick={() => props.setPage("example")}>Example</span>
          </li>
          <li>
            <span className={computeStyle("notifications")}
             onClick={() => props.setPage("notifications")}>Notifications</span>
          </li>
          <li>
            <span className={computeStyle("task")}
             onClick={() => props.setPage("task")}>Task</span>
          </li>
        </ul>
      </nav>
    )
}