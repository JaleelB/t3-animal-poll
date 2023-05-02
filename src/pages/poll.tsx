import { useMultiStepPoll } from '../hooks/useMultiStepForm';
import Image from 'next/image';


const MultiStepPoll = () => {

  const { step, poll, nextStep, submitAnswer } = useMultiStepPoll(1);

  const handleClick = (option: string) => {
    submitAnswer(option);
    nextStep();
  };

  return (
    <main className='w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center'>
      <section className='w-[90%] h-[80%] max-w-[680px] flex flex-col'>
        <h2 className='w-full text-left text-white mb-2'>Step {step < 10 ? `0${step}` : step}/{poll?.maxLength}</h2>
        <div className='w-full h-full'>
            <div className="w-full h-full max-h-[250px] lg:max-h-[400px] min-w-[300px]">
                <figure className="w-full h-full rounded-xl bg-neutral-700 relative aspect-video">
                    <Image 
                        src={poll?.imageUrl as string}
                        alt="animal" 
                        fill
                        className='object-cover object-center rounded-xl aspect-video'
                    />
                </figure>
            </div>
            <h3 className='text-white text-2xl mt-3'>{poll?.question}</h3>
            <div className='flex flex-col md:flex-row gap-2 mt-3'>
                {
                    poll?.options.map((option: string, index: number)=>{
                        return (
                            <button 
                                key={index} 
                                onClick={()=> handleClick(option)}
                                className='basis-full md:basis-1/2 bg-white text-gray-900 py-3 md:py-4 rounded-md'
                            >
                                {option}
                            </button>
                        )
                    })
                }
            </div>
        </div>
        
      </section>
    </main>
  );
};

export default MultiStepPoll;
