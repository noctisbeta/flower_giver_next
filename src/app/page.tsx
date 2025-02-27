"use client";

import Flower from "@/components/Flower";
import FlowerLoader from "@/components/FlowerLoader";
import Message from "@/components/Message";
import NoMessage from "@/components/NoMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const lang = searchParams.get("lang");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = name && lang;

  // Redirect to root if invalid parameters are detected in URL
  useEffect(() => {
    if (searchParams.toString() && !showMessage) {
      router.push("/");
    }
  }, [searchParams, showMessage, router]);

  useEffect(() => {
    if (showMessage) {
      setLoading(true);

      fetch("/api/generate-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, language: lang }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setMessageText(data.message);
          } else {
            setMessageText(getDefaultMessage(name as string, lang as string));
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching generated message:", error);
          setMessageText(getDefaultMessage(name as string, lang as string));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [name, lang, showMessage]);

  // Default messages as fallback
  const getDefaultMessage = (name: string, language: string) => {
    const messages: { [key: string]: string } = {
      en: `Here's a flower for you, [NAME]${name}[/NAME]!`,
      es: `¡Aquí tienes una flor, [NAME]${name}[/NAME]!`,
      fr: `Voici une fleur pour toi, [NAME]${name}[/NAME]!`,
      de: `Hier ist eine Blume für dich, [NAME]${name}[/NAME]!`,
      sl: `Tukaj je roža zate, [NAME]${name}[/NAME]!`,
      ja: `[NAME]${name}[/NAME]、あなたに花をどうぞ！`,
    };

    return messages[language] || messages.en;
  };

  return (
    <div className="container">
      {showMessage ? (
        loading ? (
          <FlowerLoader />
        ) : (
          <>
            <Flower />
            <Message message={messageText} />
          </>
        )
      ) : (
        <>
          <Flower />
          <NoMessage />
        </>
      )}
    </div>
  );
}
