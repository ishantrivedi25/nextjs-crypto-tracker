"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import Button from "@/components/button/button";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.mainFlex}>
      <div className={styles.infoLanding}>
        <motion.h1
          className={styles.heading1}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className={styles.heading2}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className={styles.infoText}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Track crypto through a public api in real time. Visit the dashboard to
          do so!{" "}
        </motion.p>
        <motion.div
          className={styles.btnFlex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.75 }}
        >
          <Link href="/dashboard">
            <Button text={"Dashboard"} />
          </Link>
        </motion.div>
      </div>
      <div className={styles.gradientDiv}>
        <Image
          src="/gradient.png"
          alt="Gradient Background"
          className={styles.gradient}
          width={200}
          height={365}
        />

        <motion.img
          src="/iphone.png"
          className={styles.iphone}
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}
