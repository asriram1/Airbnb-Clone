import React, { useState } from "react";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Select from "react-select";
import IndexPage from "./pages/IndexPage";

export default function AltHeader() {
  const [hidden, setHidden] = useState(true);
  const [continent, setContinent] = useState(null);
  const [guests, setGuests] = useState(null);

  var options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  const selectOptions = [
    { value: "Everywhere", label: "World", image: "/world.png" },
    {
      value: "North America",
      label: "North America",
      image: "/north-america.png",
    },
    {
      value: "South America",
      label: "South America",
      image: "/south-america.png",
    },
    { value: "Europe", label: "Europe", image: "/europe.png" },
    { value: "Asia", label: "Asia", image: "/asia.png" },
  ];

  const guestOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10+", label: "10+" },
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "32px",
      color: "#08699B",
      fontSize: "14px",
      width: "100%",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#9CA3AF",
      };
    },
  };

  const initialRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };

  const [range, setRange] = useState(initialRange);
  return (
    <>
      <div className="flex flex-col  ">
        <div className="flex items-stretch gap-12 border border-gray-300 rounded-full bg-gray-300 py-2 px-20 mt-16 shadow-md shadow-gray-300 h-24 text-gray-600">
          <div className="flex flex-col gap-1">
            <label className="text-center font-bold text-sm"> Where? </label>
            <div className="flex justify-center items-center">
              <div className="w-[200px]">
                <Select
                  styles={colourStyles}
                  options={selectOptions}
                  onChange={(ev) => {
                    setContinent(ev.value);
                  }}
                  defaultValue={[selectOptions[0]]}
                  formatOptionLabel={(locale) => (
                    <div className="flex gap-2 items-center">
                      <img
                        src={locale.image}
                        className="size-3"
                        alt="locale-image"
                      />
                      <span className="text-gray-400">{locale.label}</span>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="border border-l border-gray-400"></div>
          <div className="flex flex-col gap-1">
            <label className="text-center font-bold text-sm"> When? </label>
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  setHidden((prev) => {
                    return !prev;
                  });
                }}
                className="flex gap-2 justify center items-center"
              >
                <div className="bg-white h-9 w-48 text-sm px-4 whitespace-nowrap flex items-center gap-7 text-gray-400 rounded-sm">
                  <span className="inline-block align-middle">
                    {range.from.toLocaleDateString("en-US", options)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                </div>
                ↔
                <div className="bg-white h-9 w-48 text-sm px-4 whitespace-nowrap flex items-center gap-7 text-gray-400 rounded-sm ">
                  <span className="inline-block align-middle">
                    {range.to.toLocaleDateString("en-US", options)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="border border-l border-gray-400"></div>
          <div className="flex flex-col gap-1">
            <label className="text-center font-bold text-sm"> Who? </label>
            <div className="flex justify-center items-center">
              <div className="w-[200px]">
                <Select
                  styles={colourStyles}
                  options={guestOptions}
                  placeholder="Add Guests"
                  formatOptionLabel={(guest) => (
                    <span className="text-gray-400">{guest.label}</span>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <button
              className="bg-primary text-white py-2 px-4 rounded-full flex items-center justify center gap-2 "
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
        <div
          className={
            hidden ? "hidden" : "block bg-white rounded mx-auto w-[625px] mt-4"
          }
        >
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
          />
          {console.log(range)}
        </div>
      </div>

      {/* <IndexPage continent={continent} /> */}
    </>
  );
}
