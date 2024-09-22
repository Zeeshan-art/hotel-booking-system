import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-800 sm:px-0 px-2">
      <nav aria-label="Global" className="flex items-center justify-between container mx-auto py-6 w-full ">
        <div className="flex lg:flex-1">
          <Link to="/" className="text-white text-3xl font-bold">
            SpentHolidays
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {isLoggedIn ? (
            <div className='lg:flex lg:gap-x-3'>
              <Link
                to="/my-bookings"
                className="text-white flex items-center px-3 font-bold hover:bg-indigo-600"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-white flex items-center px-3 font-bold hover:bg-indigo-600"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <Link
              className="flex items-center bg-white p-3 text-blue-800 font-bold hover:bg-gray-200"
              to="/login"
            >
              Sign In
            </Link>
          )}
        </PopoverGroup>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-indigo-800 p-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="text-white text-3xl font-bold">
              SpentHolidays
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {isLoggedIn ? (
                <div className="space-y-2 py-6 flex flex-col">
                  <Link
                    to="/my-bookings"
                    className="text-white text-xl flex items-center p-3 font-bold hover:bg-indigo-600"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/my-hotels"
                    className="text-white text-xl flex items-center p-3 font-bold hover:bg-indigo-600"
                  >
                    My Hotels
                  </Link>
                  <SignOutButton className='text-xl hover:bg-indigo-600' />
                </div>
              ) : (
                <Link
                  className="flex items-center justify-center bg-white pt-3 pb-3 sm:p-3 text-blue-800 text-xl font-bold hover:bg-gray-200"
                  to="/login"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
