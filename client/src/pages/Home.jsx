import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LatestDestinationCard from '../components/LatestDestinationCard';
import { searchHotel } from '../redux/slice/hotel/thunk';

const Home = () => {
    const hotels = useSelector( state => state.hotel.data)
    const dispatch =useDispatch()  
    useEffect(()=>{
        dispatch(searchHotel())
    },[]) 
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home