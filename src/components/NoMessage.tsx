"use client";

import { useRef, useState } from "react";
import styles from "./NoMessage.module.css";

export default function NoMessage() {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("en");
  const toastRef = useRef<HTMLDivElement>(null);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
      void shareFlower();
    }
  };

  const showToast = (message: string, url?: string) => {
    if (!toastRef.current) return;

    const toast = toastRef.current;

    if (url) {
      toast.innerHTML = `
        ${message}
        <button class="${styles.toastAction}" id="toast-button">
          🌸 GO
        </button>
      `;

      setTimeout(() => {
        const toastButton = document.getElementById("toast-button");
        if (toastButton) {
          toastButton.addEventListener("click", () => {
            const fullUrl = url.startsWith("http") ? url : `https://${url}`;
            window.location.href = fullUrl;
          });
        }
      }, 0);
    } else {
      toast.textContent = message;
    }

    toast.classList.add(styles.show);
    setTimeout(() => toast.classList.remove(styles.show), 5000);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const shareFlower = async () => {
    const inputName = capitalizeFirstLetter(name.trim());
    if (!inputName) return;

    const url = new URL(window.location.href);
    url.searchParams.set("name", inputName);
    url.searchParams.set("lang", language);

    try {
      const response = await fetch("https://preseneti.me/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: url.toString() }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      const shortenedUrl = data.shortUrl;

      try {
        // Last resort fallback
        const textArea = document.createElement("textarea");
        textArea.value = shortenedUrl;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showToast(`🔗 Copied for ${inputName} ✨`, shortenedUrl);
      } catch (error) {
        showToast("Failed to copy 😔", shortenedUrl);
        console.error("Clipboard/Share error:", error);
      }
    } catch (error) {
      showToast("Failed to create share link 😔");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Share a Flower</h2>
      <p className={styles.description}>
        Enter a name to create a personalized flower message
      </p>
      <div className={styles.inputGroup}>
        <div className={styles.nameRow}>
          <input
            type="text"
            className={styles.nameInput}
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <select
            className={styles.langSelect}
            title="Select language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">🇬🇧</option>
            <option value="es">🇪🇸</option>
            <option value="fr">🇫🇷</option>
            <option value="de">🇩🇪</option>
            <option value="sl">🇸🇮</option>
            <option value="ja">🇯🇵</option>
          </select>
        </div>
        <button
          onClick={() => void shareFlower()}
          className={styles.shareButton}
        >
          Send Flower
        </button>
      </div>
      <div className={styles.toast} ref={toastRef}></div>
    </div>
  );
}
