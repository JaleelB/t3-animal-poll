import React, { useEffect, useState } from 'react'
import { api } from "../utils/api";

const Statistics = () => {

    const questionStatistics = api.questions.getQuestionStatistics.useQuery().data;
    const totalAnswers = api.questions.getTotalAnswers.useQuery().data;
    const totalYes = totalAnswers?.totalYes as number;
    const totalNo = totalAnswers?.totalNo as number;
    const totalNoWidth = Math.floor(totalNo / (totalYes + totalNo) * 100);
    const totalYesWidth = Math.floor(totalYes / (totalYes + totalNo) * 100);


    return (
        <main className='w-screen min-h-screen bg-zinc-50 flex flex-col items-center'>
            <section className='w-[90%] max-w-[800px] flex flex-col py-16 lg:py-24'>
                <h1 className='text-gray-900 text-4xl'>Poll Statistics</h1>
                <p className='text-gray-500 text-sm'>See the responses of others who took this poll</p>
                <div className='w-full bg-white rounded-lg flex flex-col mt-6 p-8 gap-3 border'>
                    <h2 className='text-neutral-600 mb-3'>Impressions</h2>
                    
                    <div className='flex flex-col-reverse gap-1 w-full'>
                        <div
                            className={`h-3 bg-green-300 rounded-lg flex justify-between items-center px-3 font-medium`}
                            style={{transition: 'width 1s ease-in-out', width: `${totalYesWidth}%`}}
                        >
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span className='font-medium'>Yes!</span>
                            <span className='text-gray-900 text-right font-medium flex'>{`${totalYesWidth}%`}</span>
                        </div>
                        
                    </div>
                    <div className='flex flex-col-reverse gap-1 w-full'>
                        <div
                            className={`h-3 bg-blue-600 rounded-lg flex justify-between items-center px-3 font-medium`}
                            style={{transition: 'width 1s ease-in-out', width: `${totalNoWidth}%`}}
                        >
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span className='font-medium'>No!</span>
                            <span className='text-gray-900 text-right font-medium flex'>{`${totalNoWidth}%`}</span>
                        </div>
                        
                    </div>
                    <h2 className='text-neutral-600 text-right mt-3'>{`${(totalAnswers?.totalNo as number) + (totalAnswers?.totalYes as number)} votes`}</h2>
                </div>
            </section>

            <section className='w-[90%] max-w-[800px] py-12 lg:py-18'>
                <h2 className='text-gray-600 text-2xl text-left mb-3'>Votes per question</h2>
                <div className='grid grid-cols-1 gap-3'>
                {
                    questionStatistics?.map((question: any, index: number)=>{
                        return (
                            <div key={index} className='w-full bg-white rounded-lg flex flex-col gap-3 p-8 border'>
                                <h3 className='text-gray-900 text-lg mb-2'>{question.question}</h3>
                                <div className="w-full flex justify-between items-center">
                                    <div className='flex flex-col-reverse gap-1 w-full'>
                                        <div
                                            className={`h-3 bg-green-300 rounded-lg flex justify-between items-center px-3 font-medium`}
                                            style={{transition: 'width 1s ease-in-out', width: `${Math.floor(question.statistics.Yes / (question.statistics.Yes + question.statistics.No) * 100)}%`}}
                                        >
                                        </div>
                                        <div className='w-full flex justify-between items-center'>
                                            <span className='font-medium'>Yes!</span>
                                            <span className='text-gray-900 text-right font-medium flex'>{`${question.statistics.Yes} votes`}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                                 <div className="w-full flex justify-between items-center">
                                    <div className='flex flex-col-reverse gap-1 w-full'>
                                        <div
                                            className={`h-3 bg-blue-600 rounded-lg flex justify-between items-center px-3 font-medium`}
                                            style={{transition: 'width 1s ease-in-out', width: `${Math.floor(question.statistics.No / (question.statistics.Yes + question.statistics.No) * 100)}%`}}
                                        >
                                        </div>
                                        <div className='w-full flex justify-between items-center'>
                                            <span className='font-medium'>No!</span>
                                            <span className='text-gray-900 text-right font-medium flex'>{`${question.statistics.No} votes`}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </section>
        </main>
    )
}

export default Statistics
