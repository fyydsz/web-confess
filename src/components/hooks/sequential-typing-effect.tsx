import { useState, useEffect } from "react";

interface SequentialTypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}
function SequentialTypingEffect({ phrases, typingSpeed, deletingSpeed, delay }: SequentialTypingEffectProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [status, setStatus] = useState<"TYPING" | "DELETING">("TYPING");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === "TYPING") {
      if (charIndex < phrases[phraseIndex].length) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev + phrases[phraseIndex].charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed || 120);
      } else {
        timer = setTimeout(() => {
          setStatus('DELETING');
        }, delay || 1000);
        
      }
    } else if (status === "DELETING") {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed || 75);
      } else {
        if (phraseIndex >= phrases.length - 1) {
          return;
        }
        setStatus('TYPING');
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timer);


  }, [charIndex, status, phraseIndex, phrases, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="sequential-typing-effect">
      {displayedText}
    </span>
  )
}

export default SequentialTypingEffect;