import React from 'react'

const Statistics = () => {

    return (
        <main className='w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center'>
        <section className='w-full h-full max-w-[800px] flex flex-col py-12 lg:py-18'>
            <h1 className='text-white text-3xl'>Poll Statistics</h1>
            <div className='w-full bg-neutral-800 rounded-lg flex flex-col mt-6 p-8 gap-3'>
                <h2 className='text-neutral-600 text-lg'>Impressions</h2>
                <div className="h-12 w-full bg-neutral-700 rounded-lg"></div>
                <div className="h-12 w-full bg-neutral-700 rounded-lg"></div>
            </div>
        </section>
        </main>
    )
}

export default Statistics
