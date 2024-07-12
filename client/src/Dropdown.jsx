import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import React from "react";
import { GoChevronDown } from "react-icons/go";
import UseOutsideClick from "./UseOutsideClick";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Dropdown({
  id,
  title,
  data,
  user,
  position,
  hasImage,
  style,
  selectedId,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  function handleChange(item) {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item.id);
    }
    setIsOpen(false);
  }

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      if (newSelectedItem) {
        setSelectedItem(newSelectedItem);
      } else {
        setSelectedItem(undefined);
      }
    }
  }, [selectedId, data]);

  const dropdownRef = useRef(null);
  UseOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  async function logout() {
    console.log("logout here");

    axios.post("/logout").then((res) => {
      console.log(res);
      window.location.href = "/login";
    });

    // <Navigate to={"/login"} />;
  }

  const dropdownClass = classNames(
    "absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10 ml-2",
    {
      "top-full right-0 mt-2": position === "bottom-right",
      "top-full left-0 mt-2": position === "bottom-left",
      "bottom-full right-0 mb-2": position === "top-right",
      "bottom-full left-0 mb-2": position === "top-left",
    }
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center gap-5 rounded-2xl w-full py-2 px-4 border text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 relative top-1"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span>{selectedItem?.name || title}</span>
        <GoChevronDown
          size={20}
          className={classNames("transform duration-500 ease-in-out", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
            className="leading-10"
          >
            {/* {data?.map((item) => ( */}
            {user ? (
              <>
                <Link
                  to={user ? "/account" : "/login"}
                  //   key={item.id}
                  // onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-gray-200 px-3"
                    // { "bg-gray-300": selectedItem?.id === item.id }
                  )}
                >
                  <span>My Profile</span>
                </Link>
                <Link
                  to={user ? "/account/bookings" : "/login"}
                  //   key={item.id}
                  // onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-gray-200 px-3"
                    // { "bg-gray-300": selectedItem?.id === item.id }
                  )}
                >
                  <span>My Bookings</span>
                </Link>

                <Link
                  to={user ? "/account/places" : "/login"}
                  //   key={item.id}
                  // onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-gray-200 px-3"
                    // { "bg-gray-300": selectedItem?.id === item.id }
                  )}
                >
                  <span>My Accomodations</span>
                </Link>
                <Link
                  onClick={logout}
                  //   key={item.id}
                  // onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-gray-200 px-3 w-[160px]"
                    // { "bg-gray-300": selectedItem?.id === item.id }
                  )}
                >
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  //   key={item.id}
                  // onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-gray-200 w-[160px] px-3"
                    // { "bg-gray-300": selectedItem?.id === item.id }
                  )}
                >
                  <span>Login</span>
                </Link>
                <Link
                  to={"/register"}
                  //   key={item.id}
                  // onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-gray-200 px-3"
                    // { "bg-gray-300": selectedItem?.id === item.id }
                  )}
                >
                  <span>Register</span>
                </Link>
              </>
            )}

            {/* <button
              onClick={() => {
                logout();
              }}
              //   key={item.id}
              // onClick={() => handleChange(item)}
              className={classNames(
                "flex items-center cursor-pointer hover:bg-gray-200 px-3"
                // { "bg-gray-300": selectedItem?.id === item.id }
              )}
            >
              <span>Logout</span>
            </button> */}
            {/* ))} */}
          </ul>
        </div>
      )}
    </div>
  );
}
