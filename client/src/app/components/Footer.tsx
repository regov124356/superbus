export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">SuperBus</h3>
            <p className="text-gray-400 leading-relaxed">
              Profesjonalny transport autobusowy na najwyższym poziomie. 
              Z nami dotrzesz wszędzie bezpiecznie i komfortowo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Szybkie linki</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/#home" className="hover:text-blue-400 transition-colors">Start</a>
              </li>
              <li>
                <a href="/#news" className="hover:text-blue-400 transition-colors">Aktualności</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-blue-400 transition-colors">O nas</a>
              </li>
              <li>
                <a href="/booking" className="hover:text-blue-400 transition-colors">Zamów bus</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-blue-400 transition-colors">Kontakt</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Czułów 121</li>
              <li>32-060 Liszki</li>
              <li>+48 601 481 319</li>
              <li>info@superbus.com.pl</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 SuperBus. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}