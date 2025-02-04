"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Switch } from "@mui/material";
import { toast } from "react-toastify";

import Button from "@/components/button/button";
import styles from "./header.module.css"; // Using CSS Modules

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const changeMode = () => {
    if (localStorage.getItem("theme") !== "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  return (
    <div className={styles.header}>
      <h1>
        CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className={styles.links}>
        <Switch checked={darkMode} onClick={changeMode} />
        <Link href="/">
          <p className={styles.link}>Home</p>
        </Link>
        <Link href="/compare">
          <p className={styles.link}>Compare</p>
        </Link>
        <Link href="/watchlist">
          <p className={styles.link}>Watchlist</p>
        </Link>
        <Link href="/dashboard">
          <Button text="Dashboard" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
