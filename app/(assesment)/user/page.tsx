"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import styles from "./page.module.css";
import NewLeadForm from "@/components/NewLeadForm";

const AssessmentForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/placeholder.svg"
          alt="Alma logo"
          width={100}
          height={40}
          className={styles.logo}
        />
        <h1 className={styles.title}>
          Get An Assessment Of Your Immigration Case
        </h1>
      </header>
      <section className={styles.formContainer}>
        <h2>Want to understand your visa options ?</h2>
        <p>
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assesment of your case
          based on your goals
        </p>
        <NewLeadForm />
      </section>
    </div>
  );
};

export default AssessmentForm;
