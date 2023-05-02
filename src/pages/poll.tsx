import router from 'next/router';
import { useMultiStepPoll } from '../hooks/useMultiStepPoll';
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
    <main className='w-screen h-screen bg-zinc-50 flex flex-col justify-center items-center'>
      <section className='w-[90%] max-w-[480px] xl:max-w-[680px] flex flex-col p-4 border bg-white rounded-2xl'>
        <h2 className='w-fit rounded-full text-left text-sm font-medium mb-3 text-gray-600'>Question {step < 10 ? `0${step}` : step}/{poll?.maxLength}</h2>
        <div className='h-max'>
            <h3 className='text-gray-900 text-2xl '>{poll?.question}</h3>
            <div className="">
                <figure className="w-full h-full rounded-xl bg-violet-200 relative aspect-video mt-3">
                  <Image 
                    src={poll?.imageUrl as string}
                    alt="animal" 
                    fill
                    className='object-cover object-center rounded-xl aspect-video'
                  />
                </figure>
            </div>
            
            <div className='flex flex-col md:flex-row gap-2 mt-3'>
                {
                    poll?.options.map((option: string, index: number)=>{
                        return (
                            <button 
                                key={index} 
                                onClick={()=> handleClick(option)}
                                className={`basis-full md:basis-1/2 ${index === 0 ? 'bg-neutral-900 text-gray-200' : 'border-2 border-black text-gray-900'} py-3 md:py-4 rounded-md`}
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
