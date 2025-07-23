// import TypingEffect from './components/animation/typing-effect';
// import SequentialTypingEffect from './components/hooks/sequential-typing-effect';
// import { useIsMobile } from './components/hooks/no-mobile';
import { useEffect, useRef, useState } from 'react';
import './App.css'
import { useIsMobile } from './components/hooks/no-mobile';
import Intro from './components/pages/Intro';
import TheBook from './components/pages/TheBook';
import MusicNotifier from './components/hooks/music-notifier';
import { cn } from './lib/utils';

// function App() {
//   const isMobile = useIsMobile();
//   if (isMobile) {
//     return (
//       <div className="flex">
//         <p className='text-[25px]'>Maaf, web ini tidak dapat diakses melalui perangkat mobile.</p>
//       </div>
//     );
//   }
//   const phrases = ["Halo bang", "Aku cuma nyoba nyoba aja bang", "Serius"];
//   return (
//     <>
//       <div>
//         <h1 className='text-3xl'>
//           <SequentialTypingEffect phrases={phrases} />
//         </h1>
//       </div>
//     </>
//   )
// }

// function App() {
//   return (
//     <div className={cn(
//         "App",
//         "h-screen w-screen flex justify-center items-center",
//         // "bg-[url('/img/sunset.jpg')] bg-cover bg-[position:center_bottom] bg-no-repeat bg-fixed"
//         "bg-zinc-400"
//       )}>
//       <main>
//         <div className="flex justify-center items-center">
//           {/* <TheBook /> */}
//           <Intro />
//         </div>
//       </main>
//     </div>
//   );
// }

function App() {
  const isMobile = useIsMobile();
  const [showBook, setShowBook] = useState(false);
 
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (showBook) {
      audioRef.current?.play().catch(error => {
        console.error("Audio play was prevented:", error);
      });
    }
  }, [showBook]);

  const handleIntroComplete = () => {
    setShowBook(true);
  };


  return (
    <div className={cn(
      "App",
      "h-screen flex justify-center items-center",
      "bg-[#262626]",
    )}>
      <main className='w-full h-full flex justify-center items-center overflow-hidden'>
        {/* 3. Gunakan kondisi di dalam JSX untuk menentukan apa yang akan dirender. */}
        {isMobile ? (
          <div className="justify-center items-center p-5 flex">
            <p className='text-white text-center text-[25px]'>Maaf, web ini tidak support untuk perangkat mobile.</p>
          </div>
        ) : showBook ? (
          <TheBook />
        ) : (
          <Intro onComplete={handleIntroComplete} />
        )}
      </main>
      <audio ref={audioRef} src="/music/firebird.mp3" loop />
      <MusicNotifier isPlaying={showBook} trackName="Galantis - Firebird" />
    </div>

  );
}

export default App;