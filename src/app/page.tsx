"use client";

import Flower from "@/components/Flower";
import FlowerLoader from "@/components/FlowerLoader";
import Message from "@/components/Message";
import NoMessage from "@/components/NoMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Content component that uses useSearchParams
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const lang = searchParams.get("lang");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true); // Initialize as true

  const showMessage = name && lang;

  useEffect(() => {
    if (searchParams.toString() && !showMessage) {
      router.push("/");
      return;
    }

    if (!showMessage) {
      setLoading(false);
      return;
    }

    fetch("/api/generate-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, language: lang }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessageText(
          data.message || getDefaultMessage(name as string, lang as string)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching generated message:", error);
        setMessageText(getDefaultMessage(name as string, lang as string));
        setLoading(false);
      });
  }, [name, lang, showMessage, router, searchParams]);

  // Early return while loading
  if (loading) {
    return <FlowerLoader />;
  }

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
        <>
          <Flower />
          <Message message={messageText} />
        </>
      ) : (
        <>
          <Flower />
          <NoMessage />
        </>
      )}
    </div>
  );
}

// Main component with Suspense
export default function Home() {
  return (
    <Suspense fallback={<FlowerLoader />}>
      <HomeContent />
    </Suspense>
  );
}
