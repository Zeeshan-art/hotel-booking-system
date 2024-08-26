import { CardCvcElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createHotelBooking } from "../redux/slice/hotel/thunk";

const ConfirmDetails = ({ currentUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { checkIn, checkOut, adultCount, childCount } = useSelector((state) => state.booking);

  const { paymentIntentData, isBookingSuccess, isLoading } = useSelector((state) => state.hotel);
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: adultCount,
      childCount: childCount,
      checkIn: checkIn,
      checkOut: checkOut,
      hotelId: hotelId,
      totalCost: paymentIntentData?.data?.totalCost || 0,
      paymentIntentId: paymentIntentData?.data?.paymentIntentId || '',
    },
  });

  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }
      const result = await stripe.confirmCardPayment(paymentIntentData.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.paymentIntent.status === 'succeeded') {
        dispatch(createHotelBooking({ ...formData, paymentIntentId: result.paymentIntent.id })).then(()=>{
          navigate('/complete')
        });
      }
  };
  

  if (isLoading && isBookingSuccess) {
    return <div>Loading...</div>;
  }

  
  return (
    <form className=" grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-bold">Confirm Your Detail</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <label className="mb-1">
          First Name
          <input
            type="text"
            className="bg-slate-200 px-2 py-1 w-full rounded-sm"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="mb-1">
          Last Name
          <input
            type="text"
            className="bg-slate-200 px-2 py-1 w-full rounded-sm"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm flex-1">
        Email
        <input
          type="email"
          className="border bg-slate-200 rounded-sm font-normal w-full py-1 px-2"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <div className="">
        <h2 className="text-md semibold">Your Price Summary</h2>
        <label>
          <div className="p-2 bg-blue-200 border rounded">
            <h3 className="text-md font-bold ">{paymentIntentData.data.totalCost}</h3>
            <div>Tax and charges include</div>
          </div>
        </label>
      </div>
      <label className="flex-1 text-sm font-bold">
        Payment Details
        <CardElement id='payment-element' className="border border-slate-300 rounded-md p-2 text-sm">

        </CardElement>
      </label>
      <div className="flex justify-end">
       <button disabled={isBookingSuccess} className="p-2 bg-blue-700 w-fit justify-end text-white disabled:bg-gray-500">
          {isBookingSuccess ? 'Saving...' : 'Confirm Booking'}
        </button>
        
      </div>
    </form>
  );
};

export default ConfirmDetails;
