import { PollData } from '~/lib/types';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import Image from 'next/image';
import { number } from 'zod';


const Step = ({ data }: { data: PollData }) => {
  return (
    <div className='w-full h-full'>
        <div className="w-full h-full max-h-[250px] lg:max-h-[400px] min-w-[300px]">
            <figure className="w-full h-full rounded-xl bg-neutral-700 relative aspect-video">
                <Image 
                    src={'/banner.jpg'}
                    alt="animal" 
                    fill
                    className='object-cover object-center rounded-xl aspect-video'
                />
                <figcaption className='text-white'>Peacock</figcaption>
            </figure>
        </div>
        <div className='flex flex-col md:flex-row gap-2 mt-3'>
            <button className='basis-full md:basis-1/2 bg-white text-gray-900 py-3 md:py-4 rounded-md'>Yes</button>
            <button className='basis-full md:basis-1/2 bg-white text-gray-900 py-3 md:py-4 rounded-md'>No</button>
        </div>
    </div>
  )
};

const MultiStepForm = () => {

    // const pollData = api.questions.getPoll.useQuery({pollId: 0});
    
//   const { data: pollData } = trpc.useQuery(['polls']);

  const { step, poll, nextStep, prevStep } = useMultiStepForm(1);

  return (
    <main className='w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center'>
      {/* {pollData && (
        <>
          <Step data={pollData[currentStep]} />
          <button type="button" onClick={previousStep} disabled={currentStep === 0}>
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep === pollData.length - 1}
          >
            Next
          </button>
        </>
      )} */}
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
                                onClick={()=> index == 0 ? prevStep() : nextStep()}
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

export default MultiStepForm;
