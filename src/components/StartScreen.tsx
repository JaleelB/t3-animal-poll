import React, { FC } from 'react';
import Image from 'next/image';

type StartScreenProps = {
  onStart: () => void;
}

const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
  return (
    <main className="w-screen flex flex-col justify-center items-center h-screen overflow-hidden">
      <section className="text-left sm:text-center w-full px-4 sm:w-[70%] max-w-3xl mx-auto py-16 md:py-18 xl:py-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
          Welcome to the Ultimate Animal Lover's Poll
        </h1>
        <h2 className="text-base xl:text-lg mb-8 opacity-40">
          Discover how your feelings about animals compare to others!
        </h2>
        <button
          onClick={onStart}
          className="bg-transparent border-black text-black border-[1.5px] hover:bg-black hover:text-white transition-all py-3 md:py-4 font-medium rounded-full px-8 md:px-16 focus:outline-none text-sm md:text-base"
        >
          Let's Get Started
        </button>
      </section>
      <section className='flex-grow h-full w-full lg:px-4 xl:px-8'>
        <figure className='w-full h-full relative'>
          <Image 
            src={'/banner.jpg'}
            alt="animal" 
            fill
            className='object-cover object-center'
          />
        </figure>
      </section>
    </main>
  );
};

export default StartScreen;
