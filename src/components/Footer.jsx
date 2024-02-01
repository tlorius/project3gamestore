import classes from "../styles/Footer.module.css";
import gitHubLogo from "../assets/github-mark-white.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footerCtn}>
      <p>
        <Link
          to="https://github.com/tlorius/project3gamestore"
          className={classes.linkCtn}
        >
          <img className={classes.ghImg} src={gitHubLogo} alt="GitHub" />{" "}
          Vanguard
        </Link>{" "}
        is an Educational Project made at Ironhack by{" "}
      </p>
      <Link to="https://github.com/tlorius" className={classes.linkCtn}>
        <img className={classes.ghImg} src={gitHubLogo} alt="GitHub" /> Tom
        Lorius
      </Link>
      <Link to="https://github.com/michelmnds" className={classes.linkCtn}>
        <img className={classes.ghImg} src={gitHubLogo} alt="GitHub" /> Michel
        Mendes
      </Link>
      <Link to="https://github.com/HChughtai98" className={classes.linkCtn}>
        <img className={classes.ghImg} src={gitHubLogo} alt="GitHub" /> Haris
        Chughtai
      </Link>
    </footer>
  );
};

export default Footer;
