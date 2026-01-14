"use client";

import React, { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import styles from "../../../styles/landing/webdevelopment/webcalltoaction.module.css";

function WebCalltoaction() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleForceLogin = async () => {
    await signOut({ redirect: false });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    signIn("google", {
      prompt: "consent",
      callbackUrl: window.location.href,
    });
  };

  const handleScheduleMeeting = async () => {
    setMessage("");
    setMessageType("");

    if (!session) {
      await handleForceLogin();
      return;
    }

    if (!dateTime) {
      setMessage("❌ Please select date & time");
      setMessageType("warning");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/create-meet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          dateTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userEmail: session.user.email,
          userName: session.user.name || session.user.email
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || data.error?.includes("insufficient authentication scopes")) {
          setMessage("⚠️ Authentication issue. Re-login required...");
          setMessageType("warning");
          await handleForceLogin();
          return;
        }
        throw new Error(data.error || "Failed to create meeting");
      }

      setMessage(`
        ✅ Meeting scheduled successfully!
        • Check your email for meeting details
        • Meeting added to your Google Calendar
        • Admin has been notified
      `);
      setMessageType("success");
      setDateTime("");

    } catch (err) {
      console.error("Error in handleScheduleMeeting:", err);
      setMessage(`❌ ${err.message}`);
      setMessageType("error");
      
      if (err.message.includes("insufficient") || err.message.includes("scope")) {
        await handleForceLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setMessage("");
    setMessageType("");
    setDateTime("");
  };

  const getMessageClass = () => {
    switch(messageType) {
      case "success": return styles.successMessage;
      case "error": return styles.errorMessage;
      case "warning": return styles.warningMessage;
      default: return "";
    }
  };

  return (
    <div className={styles.container}>
      {/* Galaxy Stars Background */}
      <div className={styles.starsContainer}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`${styles.star} ${styles[`star${i}`]}`}></div>
        ))}
      </div>
      
      <div className={styles.contentWrapper}>
        {/* Process Section */}
        <div className={styles.process}>
          <h2 className={styles.processTitle}>How Our Process Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <button className={styles.stepButton}>01 Consultation</button>
              <p className={styles.stepDescription}>
                Share your goals, and we'll analyze your needs to create a roadmap.
              </p>
            </div>
            <div className={styles.arrow}>&rarr;</div>
            <div className={styles.step}>
              <button className={styles.stepButton}>02 Strategy & Execution</button>
              <p className={styles.stepDescription}>
                We implement tailored solutions to maximize your business growth.
              </p>
            </div>
            <div className={styles.arrow}>&rarr;</div>
            <div className={styles.step}>
              <button className={styles.stepButton}>03 Results & Scaling</button>
              <p className={styles.stepDescription}>
                We ensure measurable success and help you scale efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
          <p className={styles.ctaSubtitle}>
            Whether you need digital solutions, marketing, or consulting, we deliver 
            results that drive growth. Let's discuss how we can help you succeed.
          </p>

          {/* Schedule Header */}
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#f97316",
            marginBottom: "0.5rem"
          }}>
            Schedule a Free Google Meet
          </h3>
          
          <p style={{
            color: "#e2e8f0",
            marginBottom: "1.5rem",
            fontSize: "1rem"
          }}>
            Book a 30-minute consultation with our experts
          </p>

          {/* Session Info */}
          {session ? (
            <div className={styles.sessionInfo}>
              <p style={{
                color: "#fff",
                fontWeight: "500",
                marginBottom: "0.5rem"
              }}>
                ✅ Logged in as: {session.user.email}
              </p>
              <div className={styles.buttonGroup}>
                <button 
                  onClick={handleForceLogin}
                  className={styles.secondaryButton}
                >
                  Re-login
                </button>
                <button 
                  onClick={handleSignOut}
                  className={styles.dangerButton}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.loginPrompt}>
              <p style={{
                color: "#fff",
                fontWeight: "500",
                marginBottom: "1rem"
              }}>
                🔒 Please sign in to schedule a meeting
              </p>
              <button 
                onClick={handleForceLogin}
                style={{
                  background: "#f97316",
                  color: "white",
                  border: "none",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Sign In with Google
              </button>
            </div>
          )}

          {/* Date/Time Picker */}
          <div className={styles.dateInputWrapper}>
            <label className={styles.dateLabel}>
              Select Date & Time:
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => {
                setDateTime(e.target.value);
                setMessage("");
                setMessageType("");
              }}
              className={styles.dateInput}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Schedule Button */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button
              onClick={handleScheduleMeeting}
              disabled={loading || status === "loading"}
              className={styles.getStartedButton}
            >
              {loading ? "Creating Meeting..." : 
               status === "loading" ? "Checking..." : 
               "Get Started Now"}
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`${styles.messageContainer} ${getMessageClass()}`}>
              <div style={{ 
                fontWeight: "600",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                {messageType === "success" ? "✅ Success!" : 
                 messageType === "warning" ? "⚠️ Notice" : "❌ Error"}
              </div>
              {message.split('\n').map((line, i) => (
                <div key={i} style={{ 
                  margin: i === 0 ? "0 0 8px 0" : "5px 0",
                  fontWeight: i === 0 ? "600" : "normal"
                }}>
                  {line.trim()}
                </div>
              ))}
            </div>
          )}

          {/* Instructions */}
          {!session && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{
                color: "#f97316",
                marginBottom: "0.8rem",
                fontSize: "1rem"
              }}>
                📌 How it works:
              </h4>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
                textAlign: "left"
              }}>
                <div>
                  <div style={{
                    backgroundColor: "#f97316",
                    color: "white",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                    fontWeight: "600",
                    fontSize: "0.8rem"
                  }}>1</div>
                  <span style={{ fontWeight: "500", fontSize: "0.9rem" }}>Sign In</span>
                  <p style={{ marginTop: "3px", color: "#a0aec0", fontSize: "0.8rem" }}>
                    Authenticate with Google
                  </p>
                </div>
                
                <div>
                  <div style={{
                    backgroundColor: "#f97316",
                    color: "white",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                    fontWeight: "600",
                    fontSize: "0.8rem"
                  }}>2</div>
                  <span style={{ fontWeight: "500", fontSize: "0.9rem" }}>Select Time</span>
                  <p style={{ marginTop: "3px", color: "#a0aec0", fontSize: "0.8rem" }}>
                    Choose your preferred slot
                  </p>
                </div>
                
                <div>
                  <div style={{
                    backgroundColor: "#f97316",
                    color: "white",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                    fontWeight: "600",
                    fontSize: "0.8rem"
                  }}>3</div>
                  <span style={{ fontWeight: "500", fontSize: "0.9rem" }}>Schedule Meeting</span>
                  <p style={{ marginTop: "3px", color: "#a0aec0", fontSize: "0.8rem" }}>
                    We'll send you Google Meet details
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <span>⏱️</span>
              <span>30-minute free consultation</span>
            </div>
            <div className={styles.feature}>
              <span>📅</span>
              <span>Flexible scheduling</span>
            </div>
            <div className={styles.feature}>
              <span>📧</span>
              <span>Instant confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebCalltoaction;