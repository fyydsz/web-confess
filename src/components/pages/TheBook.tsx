import HTMLFlipBook from "react-pageflip";
import TypingEffect from "../hooks/typing-effect";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

// Ini adalah objek dengan method flipNext/flipPrev
interface FlipBookApi {
  flipNext: () => void;
  flipPrev: () => void;
  getPageCount: () => number;
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

  // State untuk mengontrol animasi pop-up
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    // Set `isVisible` menjadi true sesaat setelah komponen di-mount.
    // Ini memberi browser waktu untuk merender state awal (tak terlihat).
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Jeda singkat 100ms

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Array dependensi kosong agar hanya berjalan sekali


  // State untuk mengelola halaman saat ini dan status pengetikan
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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

  const handleInit = (api: FlipBookApi) => {
    console.log("Book is initialized");
    setTotalPages(api.getPageCount());
  };


  const handleNextPage = () => {
    if (!isBookOpen) {
      // Jika buku tertutup, jalankan animasi membuka
      setIsBookOpen(true);
      setTimeout(() => {
        bookRef.current?.pageFlip().flipNext();
      }, 500); // Sesuaikan dengan durasi transisi
    } else {
      // Jika buku sudah terbuka, langsung balik halaman
      bookRef.current?.pageFlip().flipNext();
    }
  };

  const handlePreviousPage = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={cn(
          "relative w-[700px] h-[500px]",
          // Terapkan transisi untuk properti transform dan opacity
          "transition-all duration-1000 ease-out",
          // Atur state awal dan akhir dari animasi
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          // Logika untuk centering saat buku tertutup
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
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
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
          onInit={(e: any) => handleInit(e.object)}
        >
          <div className={`${[coverClasses, rightPageAttributes].join(" ")} bg-zinc-800 `} >
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

      {/* Tombol Navigasi Buku */}
      <div className="flex space-x-4 mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="transition-all hover:scale-103 hover:shadow-lg active:scale-90 active:brightness-90"
        >
          Previous Page
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="transition-all hover:scale-103 hover:shadow-lg active:scale-90 active:brightness-90"
        >
          Next Page
        </Button>
      </div>
      
    </div>
  );
}

export default TheBook;