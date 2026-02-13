import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { IoReorderThreeSharp } from "react-icons/io5";

import logo from "../../assets/logo.jpeg";

import { Link } from "react-router-dom";

import { SidebarSection } from "./Sidebar";
export function Navbar() {
  const [isSidebar, setIsSidebar] = useState(false);
  return (
    <div>
     
      <div
        className={
          isSidebar
            ? "hidden"
            : "flex items-center justify-between py-1 px-5 shadow-md"
        }
      >
        <div className="md:w-20 md:h-20 h-16 w-16 rounded-full overflow-hidden">
          <img
            src={logo}
            alt="Daily local services"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          className="md:hidden block cursor-pointer"
          onClick={() => setIsSidebar(!isSidebar)}
        >
          <IoReorderThreeSharp size={30} />
        </button>

        <NavigationMenu className={"md:block hidden"}>
          <NavigationMenuList>
            {/* home  */}
            <NavigationMenuLink asChild>
              <Link
                className="focus:text-red-500 focus:underline no-underline"
                to="/"
              >
                Home
              </Link>
            </NavigationMenuLink>
            {/* explore  */}
            <NavigationMenuLink asChild>
              <Link
                className="focus:text-red-500 focus:underline no-underline"
                to="/explore"
              >
                Explore
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="focus:text-red-500 focus:underline no-underline"
                to="/booking"
              >
                Booking
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="focus:text-red-500 focus:underline no-underline"
                to="/profile"
              >
                Profile
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="focus:text-red-500 focus:underline no-underline"
                to="/login"
              >
                Login
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isSidebar && (
        <SidebarSection isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      )}
    </div>
  );
}
