import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.title}>Instagram API Wrapper</h1>

                <p className={styles.text}>
                    provides a <span className={styles.highlight}>Next.js API route </span>
                    to fetch detailed Instagram user information using the{" "}
                    <span className={styles.highlightOrange}>Instagram Private API</span>.
                </p>

                <h2 className={styles.subtitle}>Example Request</h2>
                <pre className={styles.codeBlock}>
                    <code>GET /api/instagram?username=example_user&amp;key=YOUR_API_KEY</code>
                </pre>

                <p className={styles.text}>
                    Replace <span className={styles.highlightOrange}>example_user</span> with the Instagram username you want to fetch
                    and <span className={styles.highlightOrange}>YOUR_API_KEY</span> with your API key defined in environment variables.
                </p>
            </div>
        </div>
    );
}

