// hooks/page-content.tsx (atau nama lain yang Anda suka)

interface PageContentProps {
  className?: string;
  text: string;
}

// Komponen ini tidak lagi punya state atau effect, hanya menampilkan props.
function PageContent({ text, className }: PageContentProps) {
  return (
    <p className={className}>
      {text}
    </p>
  );
}

export default PageContent;