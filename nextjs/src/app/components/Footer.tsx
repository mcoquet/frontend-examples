export default function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500">
      <p>
        This is a sample project from the{' '}
        <a 
          href="https://manifest.build" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline hover:text-gray-700"
        >
          Manifest project
        </a>
        , made by{' '}
        <a 
          href="https://github.com/mcoquet" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline hover:text-gray-700"
        >
          @mcoquet
        </a>
      </p>
    </footer>
  );
}