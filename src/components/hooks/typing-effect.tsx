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

  // di dalam komponen TypingEffect.tsx

  const renderText = () => {
    // 1. Pecah string berdasarkan format bold ("**") terlebih dahulu
    const boldParts = displayedText.split('**');

    return boldParts.map((boldPart, i) => {
      // Jika indeks ganjil, ini adalah teks bold
      if (i % 2 === 1) {
        return <strong key={`bold-${i}`}>{boldPart}</strong>;
      }

      // 2. Jika indeks genap, ini adalah teks biasa.
      //    Sekarang kita pecah lagi berdasarkan format italic ("*")
      const italicParts = boldPart.split('*');

      return italicParts.map((italicPart, j) => {
        // Jika indeks ganjil (di dalam sub-bagian), ini adalah teks italic
        if (j % 2 === 1) {
          return <em key={`italic-${i}-${j}`}>{italicPart}</em>;
        }

        // Jika tidak, ini adalah teks biasa
        return <Fragment key={`normal-${i}-${j}`}>{italicPart}</Fragment>;
      });
    });
  };

  return (
    <span className='typing-effect text-base leading-relaxed text-justify whitespace-pre-line'>
      {renderText()}
    </span>
  );
}

export default TypingEffect;