import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import styles from "./footer.module.css";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className={styles.footer}>
      <h2 className={styles.logo} onClick={() => topFunction()}>
        CryptoTracker<span>.</span>
      </h2>
      <div className={styles.socialLinks}>
        <a href="https://facebook.com">
          <FacebookIcon className={styles.socialLink} />
        </a>
        <a href="mailto:avivashishta@gmail.com">
          <EmailIcon className={styles.socialLink} />
        </a>
        <a href="https://www.twitter.com">
          <TwitterIcon className={styles.socialLink} />
        </a>
        <a href="https://www.instagram.com">
          <InstagramIcon className={styles.socialLink} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
