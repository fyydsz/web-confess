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
  const [isPage5TypingDone, setIsPage5TypingDone] = useState(false);

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
          <div className={`${[coverClasses, rightPageAttributes].join(" ")} bg-zinc-900 `} >
            <h1 className="text-4xl font-bold text-white">The Book of Feelings</h1>
            <p className="text-lg text-white mt-2">~A confession project</p>
            {/* Footer below*/}
            <p className="text-xs text-gray-500 mt-76">Created with ❤️ by Fyy</p>
          </div>

          {/* Halaman Isi 1*/}
          <div className={[pageClasses, leftPageAttributes,].join(" ")}>
            <TypingEffect
              className="text-base leading-relaxed text-justify "
              text={`Hello there ^.^ Semoga kamu membaca buku singkat ini sampai selesai ya.\nAku ingin confess perasaanku ke kamu, dengan sedikit flashback. \n\n Aku ingat waktu kita ngobrol, dari obrolan, cerita yang kita bagi, main bareng, dan banyak sekali "kebetulan" yang enggak ku sangka, dari sana aku ngerasa nyaman, sampai aku nunjukin hal yang gak ku tunjukin tentang diriku ke orang-orang seperti karyaku, keahlianku dengan harapan kamu bisa melihatku lebih dalam.`}
              speed={50}
              startTyping={currentPage >= 1}
              onTypingComplete={() => setIsPage1TypingDone(true)}
            />
          </div>

          {/* Halaman Isi 2 */}
          <div className={[pageClasses, rightPageAttributes].join(" ")}>
            <TypingEffect
              className="text-base leading-relaxed text-justify"
              text={`Aku juga ingat waktu pertama kali kita main Roblox. Kamu bahkan sampai top up. Aku senang, dan berharap kita bisa main lagi. Tapi setelahnya, setiap ajakanku kaya membentur ke dinding, kamu kesannya udah sulit buat diajak main. Perlahan, aku mulai berpikir mungkin kamu menghindar dan risih. \n\nPernah saat itu berencana mengajakmu nonton bareng secara online, tapi itu ga pernah terwujud, padahal aku benar-benar ingin spend time menonton series kesukaanmu "Harry Potter."`}
              speed={50}
              startTyping={isPage1TypingDone}
            />
          </div>

          {/* Halaman Isi 3 */}
          <div className={[pageClasses, leftPageAttributes].join(" ")}>
            <TypingEffect
              className="text-base leading-relaxed text-justify"
              text={`Alasan aku membuat project website ini, jawabannya sederhana:\n**i have feelings for you**.\n\nSemua usahaku untuk mendekatimu, semua hal yang aku tunjukin ke kamu, itu semua karena **aku tulus menyukaimu...**\nNamun, sikapmu saat itu membuatku berpikir kalau perasaan ini cuma satu arah. Aku mundur karena kupikir aku bukan orang yang tepat, apalagi setelah aku mendengar *ada orang lain yang mendekatimu*.`}
              speed={50}
              startTyping={currentPage >= 3}
              onTypingComplete={() => setIsPage3TypingDone(true)}
            />
          </div>

          {/* Halaman Isi 4 */}
          <div className={[pageClasses, rightPageAttributes].join(" ")}>
            <TypingEffect
              className="text-base leading-relaxed text-justify"
              text={`Aku ga masalah kalau kamu dekat dengan orang lain, tetapi waktu selama kita komunikasi, aku berharap kamu bisa jujur dan tidak ditutup-tutupi, seandainya saat itu kamu memberiku peringatan bahwa kamu risih dan ga nyaman, aku bakal ngerti dan pasti akan mundur. \n\nRasa sakit itu pasti ada tetapi hanya sesaat saja, lebih baik daripada sakit yang berkepanjangan setelah mengetahui kebenarannya. `}
              speed={50}
              startTyping={isPage3TypingDone}
            />
          </div>

          {/* Halaman Isi 5 */}
          <div className={[pageClasses, leftPageAttributes].join(" ")}>
            <TypingEffect
              className="text-base leading-relaxed text-justify"
              text={`Meskipun tidak berakhir seperti yang diharapkan, aku berterima kasih untuk waktu dan percakapannya. Dari pengalaman ini, aku belajar banyak tentang diriku sendiri, tentang harapan, dan tentang pentingnya melepaskan.\nTerima kasih untuk pelajarannya.\n\n Aku berharap kamu bahagia dengan pilihanmu, dan semoga suatu hari nanti kita bisa bertemu kembali lagi sebagai teman.`}
              speed={50}
              startTyping={currentPage >= 5}
              onTypingComplete={() => setIsPage5TypingDone(true)}
            />
          </div>

          {/* Halaman Isi 6 */}
          <div className={[pageClasses, rightPageAttributes].join(" ")}>
            <TypingEffect
              className="text-base leading-relaxed text-justify"
              text={`\n\n\nTerima kasih telah membaca buku ini. Aku harap kamu mengerti perasaanku yang kualami selama ini. Jika kamu ingin membalas, aku akan sangat menghargainya. Jika tidak, aku akan tetap menghargai keputusan itu.\n\n~Fyy`}
              speed={50}
              startTyping={isPage5TypingDone}
            />
          </div>

          {/* Sampul Belakang */}
          <div className={`${[coverClasses, leftPageAttributes].join(" ")} bg-zinc-800 text-white`}>
            <h1 className="text-4xl font-bold text-white">Thank You ❤️</h1>
            <p className="text-lg text-white mt-2">As your information:</p>
            <p className="text-sm text-gray-400 mt-6">- Project ini membutuhkan waktu 1 minggu untuk membuatnya.</p>
            <p className="text-sm text-gray-400 mt-2">- Kamu bisa lihat sumber kode yang ku buat di <a
              className="text-sm text-blue-500 mt-2"
              href="https://github.com/fyydsz/web-confess/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/fyydsz/web-confess/
            </a></p>

            {/* Footer below*/}
            <p className="text-xs text-gray-500 mt-60">Created with ❤️ by Fyy</p>
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