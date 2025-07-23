// src/components/MusicNotifier.tsx

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface MusicNotifierProps {
  isPlaying: boolean;
  trackName: string;
}

function MusicNotifier({ isPlaying, trackName }: MusicNotifierProps) {
  // State untuk mengontrol apakah komponen ada di DOM
  const [isMounted, setIsMounted] = useState(false);
  // State untuk mengontrol kelas animasi (terlihat/tidak)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kita hanya ingin memicu ini saat musik BARU mulai diputar
    if (isPlaying) {
      // 1. Pasang komponen ke DOM (tapi masih tak terlihat)
      setIsMounted(true);

      // 2. Beri jeda sangat singkat, lalu buat komponen terlihat.
      //    Ini adalah trik untuk memicu animasi masuk.
      const enterTimer = setTimeout(() => {
        setIsVisible(true);
      }, 50); // Jeda 50ms

      // 3. Atur timer untuk memulai animasi keluar setelah 4 detik
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
      }, 6050); // 7550ms (tampil) + 50ms (jeda masuk)

      // 4. Hapus komponen dari DOM setelah animasi keluar selesai
      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
      }, 6550); // 7050ms + 500ms (durasi transisi keluar)

      // Cleanup untuk membersihkan semua timer jika komponen unmount tiba-tiba
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isPlaying]); // Efek ini HANYA bergantung pada isPlaying

  // Jika tidak terpasang, jangan render apa-apa
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-8 left-8 z-50",
        "flex items-center space-x-3",
        "bg-black/70 backdrop-blur-sm",
        "text-white text-sm font-semibold",
        "py-3 px-8 rounded-lg shadow-lg",
        "transition-all duration-500 ease-out",
        // Kelas animasi sekarang dikontrol oleh `isVisible`
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <span>🎵</span>
      <span>Now Playing:<br/><strong>{trackName}</strong></span>
    </div>
  );
}

export default MusicNotifier;