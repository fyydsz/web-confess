import HTMLFlipBook from "react-pageflip";
import TypingEffect from "../hooks/typing-effect";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Ini adalah objek dengan method flipNext/flipPrev
interface FlipBookApi {
  flipNext: () => void;
  flipPrev: () => void;
}

// Dan ini adalah struktur ref utama, yang memiliki FUNGSI pageFlip
interface FlipBookActions {
  pageFlip: () => FlipBookApi;
}

function TheBook() {
  const coverClasses = "flex flex-col items-center justify-center bg-green-500 text-white border-2 border-stone-400 p-8";

  // 2. Definisikan kelas untuk HALAMAN ISI (bergaris)
  const pageClasses = [
    "flex flex-col items-start justify-start pt-6 pl-5 pr-5  border border-stone-300 bg-white",
    "leading-[2rem]",
    "bg-size-[100%_2rem]",
    "bg-[repeating-linear-gradient(transparent,transparent_23px,#d1d5db_24px)]",
  ].join(" ");
  const leftPageAttributes = "rounded-l-md"; // Hanya berisi radius
  const rightPageAttributes = "rounded-r-md"; // Hanya berisi radius

  // STATE untuk melacak status buku (tertutup/terbuka)
  const [isBookOpen, setIsBookOpen] = useState(false);
  const bookRef = useRef<FlipBookActions>(null);

  // State untuk mengelola halaman saat ini dan status pengetikan
  const [currentPage, setCurrentPage] = useState(0);
  const [isPage1TypingDone, setIsPage1TypingDone] = useState(false);
  const [isPage3TypingDone, setIsPage3TypingDone] = useState(false);

  const handleFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
    if (e.data === 0) {
      // Jika kembali ke sampul, set status buku menjadi "tertutup"
      setIsBookOpen(false);
    } else {
      // Jika di halaman lain, pastikan statusnya "terbuka"
      setIsBookOpen(true);
    }
  };

  const handleCoverClick = () => {
    if (!isBookOpen) {
      setTimeout(() => {
        // 2. Perbaiki pemanggilan fungsi dengan memanggil pageFlip() terlebih dahulu
        setIsBookOpen(true);
        // bookRef.current?.pageFlip().flipNext();
      }, 500);
    }
  };

  return (
    <div
      className={cn(
        "relative w-[700px] h-[500px] transition-transform duration-500 ease-in-out",
        // 2. Ubah nilai pergeseran menjadi -translate-x-[175px]
        { "-translate-x-[175px]": !isBookOpen }
      )}
    >
      <HTMLFlipBook
        width={350}
        height={500}
        className={"book-container"}
        style={{}}
        startPage={0}
        size={"fixed"}
        minWidth={315}
        maxWidth={1000}
        minHeight={420}
        maxHeight={1350}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        maxShadowOpacity={0.2}
        showCover={true}
        mobileScrollSupport={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={false}
        disableFlipByClick={false}
        // Event onFlip
        onFlip={handleFlip}
        ref={bookRef}
      >
        <div className={`${[coverClasses, rightPageAttributes].join(" ")} bg-zinc-800 `} onClick={handleCoverClick}>
          <h1 className="text-4xl font-bold text-white">Test Book</h1>
        </div>

        {/* Halaman Isi 1*/}
        <div className={[pageClasses, leftPageAttributes].join(" ")}>
          <TypingEffect
            className="text-base leading-relaxed text-justify"
            text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            speed={50}
            startTyping={currentPage >= 1}
            onTypingComplete={() => setIsPage1TypingDone(true)}
          />
        </div>

        {/* Halaman Isi 2 */}
        <div className={[pageClasses, rightPageAttributes].join(" ")}>
          <TypingEffect
            className="text-base leading-relaxed text-justify"
            text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}
            speed={50}
            startTyping={isPage1TypingDone}
          />
        </div>

        {/* Halaman Isi 3 */}
        <div className={[pageClasses, leftPageAttributes].join(" ")}>
          <TypingEffect
            className="text-base leading-relaxed text-justify"
            text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            speed={25}
            startTyping={currentPage >= 3}
            onTypingComplete={() => setIsPage3TypingDone(true)}
          />
        </div>

        {/* Halaman Isi 4 */}
        <div className={[pageClasses, rightPageAttributes].join(" ")}>
          <TypingEffect
            className="text-base leading-relaxed text-justify"
            text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}
            speed={25}
            startTyping={isPage3TypingDone}
          />
        </div>

        {/* Sampul Belakang */}
        <div className={`${[coverClasses, leftPageAttributes].join(" ")} bg-zinc-800! text-white`}>
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default TheBook;