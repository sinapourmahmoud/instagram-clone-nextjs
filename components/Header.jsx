import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  HomeIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Header = () => {
  let { data: session } = useSession();
  console.log(session?.user?.image);
  return (
    <div className="bg-white static top-0  px-3 lg:px-0 py-3 shadow-lg mx-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/*logo */}
        <div className="relative w-20 h-10 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            alt="logo"
            objectFit="contain"
          />
        </div>
        {/*search box */}
        <div className="bg-gray-100 py-1 flex items-center gap-1 pl-2 rounded-sm border-2 ">
          <SearchIcon className="h-5" />
          <input
            type="text"
            className="  h-6 bg-transparent p-1 text-sm font-medium outline-none"
            placeholder="Search..."
          />
        </div>
        {/*icons */}
        {session ? (
          <div className="flex items-center gap-4  ">
            <HeartIcon className="h-6 w-6 cursor-pointer lg:block hidden" />
            <HomeIcon className="h-6 w-6 cursor-pointer lg:block hidden" />
            <PlusCircleIcon className="h-6 w-6 cursor-pointer lg:block hidden " />
            <div className="relative lg:block hidden">
              <PaperAirplaneIcon className="h-8 w-8 cursor-pointer rotate-45" />
              <div className="w-4 h-4 absolute bg-red-500 top-0 animate-pulse  pointer-events-none -right-0 rounded-full flex items-center justify-center text-white text-xs">
                3
              </div>
            </div>
            <MenuIcon className="h-5 lg:hidden block" />
            <div className="w-9 h-9 rounded-full">
              <img
                onClick={() => {
                  signOut();
                }}
                src={session.user.image}
                alt="profile"
                className="w-full h-dull object-cover rounded-full cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <Link href="/auth/login" className="flex items-center gap-2">
            <UserGroupIcon className="h-6 w-6 cursor-pointer lg:block hidden" />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
