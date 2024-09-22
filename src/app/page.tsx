"use client";

import { useState } from 'react';

const HistoryList = ({ history }: { history: string[] }) => (
  <div className="mt-4 w-full max-w-md">
    <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Histórico de Verificações:</h3>
    <ul className="space-y-2">
      {history.map((item, index) => (
        <li key={index} className="text-gray-700 text-center">{item}</li>
      ))}
    </ul>
  </div>
);

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const checkPalindrome = (str: string) => {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanStr === cleanStr.split('').reverse().join('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      setIsPalindrome(null);
      return;
    }

    const result = checkPalindrome(trimmedValue);
    setIsPalindrome(result);
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, trimmedValue];
      return newHistory.length > 5 ? newHistory.slice(-5) : newHistory; // Limitar o histórico
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === '') {
      setIsPalindrome(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-8 text-center">
          Verificador de Palíndromos
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Digite uma palavra ou frase"
            className="w-full px-4 py-2 border rounded-md shadow-md text-lg border-indigo-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          />
          
          <button
            type="submit"
            disabled={inputValue.trim() === ''}
            className={`w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 transition ${inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Verificar
          </button>
        </form>

        {inputValue.trim() === '' && (
          <p className="text-red-500 text-sm mt-2 text-center">Por favor, insira uma palavra ou frase válida.</p>
        )}

        {isPalindrome !== null && (
          <h2 className={`mt-8 text-2xl sm:text-3xl font-semibold transition text-center ${isPalindrome ? 'text-green-600' : 'text-red-600'}`}>
            {isPalindrome ? `"${inputValue}" é um palíndromo!` : `"${inputValue}" não é um palíndromo.`}
          </h2>
        )}

        {/* Histórico colapsável */}
        <button className="mt-8 text-indigo-600 hover:underline" onClick={() => setShowHistory((prev) => !prev)}>
          {showHistory ? 'Ocultar Histórico' : 'Mostrar Histórico'}
        </button>

        {showHistory && history.length > 0 && <HistoryList history={history} />}
      </div>

      {/* Rodapé */}
      <footer className="w-full bg-gray-200 py-2 mt-8 text-center">
        <p className="text-gray-600 text-sm">© 2024 Verificador de Palíndromos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}