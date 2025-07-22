// hooks/typing-effect.tsx

import { useState, useEffect, Fragment } from "react";

interface TypingEffectProps {
  className?: string;
  text: string;
  speed?: number;
  startTyping?: boolean;
  // 1. Tambahkan prop callback ini
  onTypingComplete?: () => void;
}

function TypingEffect({ text, speed, startTyping = false, onTypingComplete }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (startTyping && index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);

        // 2. Cek apakah ini adalah huruf terakhir
        if (index === text.length - 1) {
          // Jika ya, dan jika ada callback, panggil callback tersebut
          if (onTypingComplete) {
            onTypingComplete();
            console.log("Typing complete callback called");
          }
        }
      }, speed || 150);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed, startTyping, onTypingComplete]); // Tambahkan onTypingComplete ke dependencies

  const renderText = () => {
    // Pecah string berdasarkan "**"
    // Contoh: "Teks **tebal** biasa" -> ["Teks ", "tebal", " biasa"]
    const parts = displayedText.split('**');

    return parts.map((part, i) => {
      // Jika indeks bagian adalah ganjil, maka itu adalah teks tebal
      if (i % 2 === 1) {
        return <strong key={i}>{part}</strong>;
      }
      
      // Jika indeks genap, itu teks biasa
      return <Fragment key={i}>{part}</Fragment>;
    });
  };

  return (
    <span className='typing-effect text-base leading-relaxed text-justify whitespace-pre-line'>
      {renderText()}
    </span>
  );
}

export default TypingEffect;