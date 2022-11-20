import React from "react";

export default function TimeGraph() {
    return(
        <div
        className='mt-8 bg-neutral-100 rounded-3xl shadow-xl p-8 w-full'
        >
            <div
                className='mb-4'
            >
                <h1
                    className='text-xl'
                >
                    Time graph
                </h1>
                <p
                    className='text-center text-2xl'
                >
                    16/11
                </p>
            </div>

            <img src="plt.png" alt="graph"
                className='mx-auto'
            />
        </div>
    )
}