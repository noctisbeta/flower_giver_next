"use client";

import { useMemo } from "react";
import styles from "./Message.module.css";

export default function Message({ message }: { message: string }) {
  const handleClick = () => {
    window.location.href = "/";
  };

  // Process the message to replace [NAME] tags with highlighted spans
  const processedMessage = useMemo(() => {
    if (!message) return "";

    // Regular expression to match [NAME]text[/NAME]
    const nameRegex = /\[NAME\](.*?)\[\/NAME\]/g;

    // Split the message by name tags and create React elements
    const parts = [];
    let lastIndex = 0;
    let match;

    // Find all matches and build an array of text and highlighted name parts
    while ((match = nameRegex.exec(message)) !== null) {
      // Add the text before the match
      if (match.index > lastIndex) {
        parts.push(message.substring(lastIndex, match.index));
      }

      // Add the highlighted name
      parts.push(
        <span key={match.index} className={styles.highlight}>
          {match[1]}
        </span>
      );

      // Update the last index to the end of the match
      lastIndex = match.index + match[0].length;
    }

    // Add any remaining text after the last match
    if (lastIndex < message.length) {
      parts.push(message.substring(lastIndex));
    }

    return parts;
  }, [message]);

  return (
    <>
      <div className={styles.message}>{processedMessage}</div>
      <button onClick={handleClick} className={styles.createButton}>
        ✨ Share Your Own Flower
      </button>
    </>
  );
}
