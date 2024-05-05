"use client";

import React, { useState } from 'react';

import Dice from '@/components/ui/Dice';

const Home = () => {
  
  const [ diceMax, setDiceMax ] = useState(4);

  return (
    <main className="flex flex-col w-screen h-screen bg-neutral-900">
      <div className='flex w-full justify-center'>

        <section className='flex flex-col justify-center items-center gap-2 w-40 mt-[30vh]'>
          <div className='flex gap-2 bg-neutral-800 p-2 rounded w-full'>
            {[
              {
                name: 'd4',
                number: 4
              },
              {
                name: 'd6',
                number: 6
              },
              {
                name: 'd10',
                number: 10
              },
              {
                name: 'd20',
                number: 20
              }
            ].map((value) => (
              <span 
                key={value.number} 
                onClick={() => {setDiceMax(value.number)}} 
                className={'flex justify-center items-center '+(diceMax == value.number ? 'bg-blue-300' : 'bg-neutral-50')+' w-8 h-8 rounded text-sm cursor-pointer'}>
                {value.name}
              </span>
            ))}
          </div>
          <div id="dice" className='flex justify-center items-center w-full h-full'>
            <Dice max={diceMax}/>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Home;