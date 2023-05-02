import router from 'next/router';
import { useMultiStepPoll } from '../hooks/useMultiStepForm';
import Image from 'next/image';


const MultiStepPoll = () => {

  const { step, poll, nextStep, submitAnswer } = useMultiStepPoll(1);

  const handleClick = (option: string) => {
    if (step < poll!.maxLength) {
      submitAnswer(option);
      nextStep();
    } else if (step === poll!.maxLength) {
      router.push('/statistics');
    }
  };

  return (
    <main className='w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center'>
      <section className='w-[90%] max-w-[480px] xl:max-w-[680px] flex flex-col bg-blue-600 p-4 rounded-3xl'>
        <h2 className='w-fit rounded-full text-left py-2 px-3 text-sm font-medium mb-3 bg-green-300 text-black'>Step {step < 10 ? `0${step}` : step}/{poll?.maxLength}</h2>
        <div className='h-max'>
            <div className="">
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
                                className='basis-full md:basis-1/2 bg-green-300 text-black py-3 md:py-4 rounded-md'
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
