// hooks/useMultiStepForm.ts
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { PollData } from "~/lib/types";

export const useMultiStepForm = (initialStep: number) => {

  const [step, setStep] = useState(initialStep);
  const [poll, setPoll] = useState<PollData | null>(null);
  const query = api.questions.getPoll.useQuery({ pollId: step });
  const length = api.questions.getLength.useQuery() as { data: number };


  useEffect(() => {
    const fetchPoll = async () => {
      try {
        if (query.data) {
          const transformedData: PollData = {
            id: query.data.id,
            questionNumber: step,
            maxLength: length.data ?? 0,
            question: query.data.question,
            imageUrl: query.data.imageSrc,
            options: query.data.options
                    ? (Object.values(query.data.options).slice(0, 2).map(String) as [string, string])
                    : ['', '']

          };
  
          setPoll(transformedData);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchPoll();
  }, [step, query.data, length.data]);
  

  const nextStep = () => {
    if( step < length.data) setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if( step > 0) setStep((prevStep) => prevStep - 1);
  };

  return { step, poll, nextStep, prevStep };
};
