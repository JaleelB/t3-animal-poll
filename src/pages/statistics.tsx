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
        <main className='w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center'>
        <section className='w-[90%] h-full max-w-[800px] flex flex-col py-12 lg:py-18'>
            <h1 className='text-white text-3xl'>Poll Statistics</h1>
            <div className='w-full bg-neutral-800 rounded-lg flex flex-col mt-6 p-8 gap-3'>
                <h2 className='text-neutral-600 text-lg'>Impressions</h2>
                <div className="h-12 w-full bg-neutral-700 rounded-lg flex justify-between items-center">
                    <div 
                        className={`h-full bg-green-300 rounded-lg flex justify-between items-center px-3`}
                        style={{transition: 'width 1s ease-in-out', width: `${totalYesWidth}%`}}
                    >
                        Yes!
                    </div>
                    <span className='text-white pr-3'>{totalAnswers?.totalYes} votes</span>
                </div>
                <div className="h-12 w-full bg-neutral-700 rounded-lg flex justify-between items-center">
                    <div 
                        className={`h-full bg-blue-600 rounded-lg flex justify-between items-center px-3`}
                        style={{transition: 'width 1s ease-in-out', width: `${totalNoWidth}%`}}
                    >
                        No!
                    </div>
                    <span className='text-white pr-3'>{totalAnswers?.totalNo} votes</span>
                </div>
            </div>
        </section>
        </main>
    )
}

export default Statistics
