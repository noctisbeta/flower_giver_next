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
      shareFlower();
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
            window.location.href = url;
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

  const shareFlower = () => {
    const inputName = capitalizeFirstLetter(name.trim());
    if (!inputName) return;

    const url = new URL(window.location.href);
    url.searchParams.set("name", inputName);
    url.searchParams.set("lang", language);

    navigator.clipboard
      .writeText(url.toString())
      .then(() => {
        showToast(`🔗 Copied for ${inputName} ✨`, url.toString());
      })
      .catch(() => {
        showToast("Failed to copy 😔");
      });
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
        <button onClick={shareFlower} className={styles.shareButton}>
          Send Flower
        </button>
      </div>
      <div className={styles.toast} ref={toastRef}></div>
    </div>
  );
}
