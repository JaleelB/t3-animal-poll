import React, { FC } from 'react';

type StartScreenProps = {
  onStart: () => void;
}

const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
  return (
    <main className="w-screen flex  items-center justify-center h-screen">
      <section className="text-center w-[90%] max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to the Ultimate Animal Lover's Poll
        </h1>
        <h2 className="text-base xl:text-xl mb-8 text-white opacity-50">
          Discover how your feelings about animals compare to others!
        </h2>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white py-4 px-16 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Let's Get Started
        </button>
      </section>
    </main>
  );
};

export default StartScreen;
