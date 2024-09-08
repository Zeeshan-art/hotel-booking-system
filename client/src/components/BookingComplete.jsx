import React from 'react';
import { Link } from 'react-router-dom';

const BookingComplete = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col gap-1 mt-20 bg-white p-10 text-center rounded-md shadow-lg'>
                <h1 className="text-2xl font-bold mb-2">Booking Completed!</h1>
                <div className="text-lg">Enjoy your journey</div>  
                <div>
                <Link className='text-indigo-800 font-semibold hover:underline'>Click here </Link> to you booking...
                    </div>
            </div>
        </div>
    );
};

export default BookingComplete;