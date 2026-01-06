export default function Footer() {
  return (
    <footer className="bg-secondary text-cream py-8 px-4 border-t border-accent/20">
      <div className="max-w-7xl mx-auto">
        <div className="pt-8 text-center">
          <p className="text-cream/70">
            &copy; {new Date().getFullYear()} Gabriel Turco. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
