"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "../../../styles/landing/webdevelopment/webcalltoaction.module.css";

function WebCalltoaction() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleScheduleMeeting = async () => {
    // agar login nahi hai → Google login
    if (!session) {
      signIn("google");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/create-meet", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("✅ Your meeting invitation has been sent via email.");
    } catch (err) {
      setMessage("❌ Failed to schedule meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Balls */}
      <div className={styles.backgroundBalls}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.ball}></div>
        ))}
      </div>

      <div className={styles.process}>
        <h2 className={styles.processTitle}>
          How Our Web & App Development Process Works
        </h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <button className={styles.stepButton}>
              01 Ideation & Planning
            </button>
            <p className={styles.stepDescription}>
              Share your vision, goals, and functionality requirements for both
              web and mobile platforms to kickstart the process.
            </p>
          </div>

          <div className={styles.arrow}>&rarr;</div>

          <div className={styles.step}>
            <button className={styles.stepButton}>
              02 Design & Development
            </button>
            <p className={styles.stepDescription}>
              We design and develop responsive websites and intuitive mobile
              apps that are fast, scalable, and tailored to your industry needs.
            </p>
          </div>

          <div className={styles.arrow}>&rarr;</div>

          <div className={styles.step}>
            <button className={styles.stepButton}>
              03 Launch & Delivery
            </button>
            <p className={styles.stepDescription}>
              After rigorous testing, we ensure smooth deployment of your
              website and app, delivering on time and with full support.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.webDevSection}>
        <h2 className={styles.webDevTitle}>
          Web & App Development Solutions That Drive Growth
        </h2>
        <p className={styles.webDevSubtitle}>
          From idea to execution, we build modern websites and mobile
          applications that are fast, user-friendly, and designed to scale with
          your business.
        </p>

        <button
          className={styles.getStartedButton}
          onClick={handleScheduleMeeting}
          disabled={loading}
        >
          {loading ? "Scheduling..." : "Schedule a Meeting"}
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "#fff" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default WebCalltoaction;
