import React, { useContext, useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import Select from "react-select";
import IndexPage from "./pages/IndexPage";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import Dropdown from "./Dropdown";

export default function AltHeader2() {
  const [hidden, setHidden] = useState(true);
  const [continent, setContinent] = useState(null);
  const [guests, setGuests] = useState(null);
  const [category, setCategory] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [selectIcon, setSelectIcon] = useState(false);
  const [selectIsland, setSelectIsland] = useState(false);
  const [selectBeachfront, setSelectBeachfront] = useState(false);
  const [selectMansion, setSelectMansion] = useState(false);
  const [selectTropical, setSelectTropical] = useState(false);
  const [selectCastle, setSelectCastle] = useState(false);
  const [selectOMG, setSelectOMG] = useState(false);
  const [selectPlay, setSelectPlay] = useState(false);
  const [selectTheTop, setSelectTheTop] = useState(false);
  const { getToken } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(continent);
    console.log(guests);
    console.log(category);
    const params = {};

    if (continent) {
      params["continent"] = continent;
    }
    if (guests) {
      params["guests"] = guests;
    }

    if (category) {
      params["category"] = category;
    }

    axios.get("/places", { params: params }).then((response) => {
      console.log(response);
      setPlaces(response.data);
    });

    const myToken = getToken();
    if (myToken) {
      const params = {};
      params["token"] = myToken;
      axios.get("/profile", { params: params }).then((response) => {
        console.log(response);
        setUser(response.data);
      });
    }
  }, [continent, guests, category, selectAll, selectIcon]);

  var options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  const selectOptions = [
    { value: null, label: "World", image: "/world.png" },
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
    { value: null, label: "Guests" },
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

  const continentMap = {
    null: 0,
    "North America": 1,
    "South America": 2,
    Europe: 3,
    Asia: 4,
  };

  const guestMap = {
    null: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    "10+": 10,
  };

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
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 4),
  };

  function handleSelect(id) {
    console.log(`Selected item with id ${id}`);
  }
  const [range, setRange] = useState(initialRange);
  return (
    <>
      <div className="py-4 flex flex-col min-h-screen">
        <header className="z-50 flex sticky top-0 justify-between h-54 bg-white shadow-[rgba(0,0,15,0.5)_0px_4px_2px_-2px]">
          <Link
            to={"/"}
            onClick={() => {
              setCategory(null);
              setContinent(null);
              setGuests(null);
              setSelectAll(true);
              setSelectBeachfront(false);
              setSelectCastle(false);
              setSelectIcon(false);
              setSelectIsland(false);
              setSelectMansion(false);
              setSelectOMG(false);
              setSelectPlay(false);
              setSelectTheTop(false);
              setSelectTropical(false);
            }}
            className="flex mt-3 ml-3 gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span className="font-bold text-xl">airbnb</span>
          </Link>

          <div className="flex flex-col w-[100%] ">
            <div className="flex items-stretch justify-between border border-gray-300 rounded-full bg-gray-300 py-2 sm:px-3 md:px-3 mt-16 shadow-md shadow-gray-300 h-24 text-gray-600">
              <div className="flex flex-col gap-1 mx-auto">
                <label className="text-center font-bold text-sm">
                  {" "}
                  Where?{" "}
                </label>
                <div className="flex justify-center items-center">
                  <div className="lg:w-[200px]">
                    <Select
                      styles={colourStyles}
                      options={selectOptions}
                      onChange={(ev) => {
                        setContinent(ev.value);
                      }}
                      defaultValue={[selectOptions[0]]}
                      value={selectOptions[continentMap[continent]]}
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
              <div className="flex flex-col gap-1 mx-auto">
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
                    <div className="bg-white h-9 lg:w-48 lg:gap-14  text-xs px-2 whitespace-nowrap flex items-center text-gray-400 rounded-sm">
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
                    <div className="bg-white h-9 lg:w-48 lg:gap-14  text-xs px-2 whitespace-nowrap flex items-center text-gray-400 rounded-sm ">
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
              <div className="flex gap-3 mx-auto">
                <div className="flex flex-col gap-1 mx-auto">
                  <label className="text-center font-bold text-sm">
                    {" "}
                    Who?{" "}
                  </label>
                  <div className="flex justify-center items-center">
                    <div className="lg:w-[200px]">
                      <Select
                        styles={colourStyles}
                        onChange={(ev) => {
                          setGuests(ev.value);
                        }}
                        options={guestOptions}
                        value={guestOptions[guestMap[guests]]}
                        placeholder="Add Guests"
                        formatOptionLabel={(guest) => (
                          <span className="text-gray-400">{guest.label}</span>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2 mx-auto">
                  <button
                    className="bg-primary text-white py-2 px-2 lg:px-4 rounded-full flex items-center justify center gap-2 "
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
                    <span className="text-xs md:text-lg lg:text-lg">
                      Search
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                hidden ? "hidden" : "block bg-white rounded mx-auto mt-4"
              }
            >
              <DayPicker
                mode="range"
                numberOfMonths={2}
                // disabledDays={[{ before: new Date() }]}
                selected={range}
                onSelect={setRange}
              />
            </div>
            <div className="flex gap-2 md:gap-4 lg:gap-10 my-auto mx-auto mt-2">
              {console.log(selectAll, selectIcon)}
              <button
                onClick={() => {
                  setCategory(null);
                  setSelectAll(true);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectAll
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-4 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                {/* <img
                src="/icon.webp"
                alt="icon"
                className="size-5 brightness-0 hover:brightness-200"
              ></img> */}
                <span>All</span>
              </button>
              <button
                onClick={() => {
                  setCategory("Island");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(true);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectIsland
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-3 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/island.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Island</span>
              </button>
              <button
                onClick={() => {
                  setCategory("OMG");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(true);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectOMG
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-3 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/omg.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>OMG</span>
              </button>
              <button
                onClick={() => {
                  setCategory("Icon");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(true);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectIcon
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-3 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/icon.webp"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Icon</span>
              </button>
              <button
                onClick={() => {
                  setCategory("Beachfront");
                  setSelectAll(false);
                  setSelectBeachfront(true);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectBeachfront
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-2 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/beachfront.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Beachfront</span>
              </button>
              <button
                onClick={() => {
                  setCategory("Mansion");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(true);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectMansion
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-2 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/mansion.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Mansion</span>
              </button>
              <button
                onClick={() => {
                  setCategory("Tropical");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(true);
                }}
                className={
                  !selectTropical
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-2 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/tropical.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Tropical</span>
              </button>
              <button
                onClick={() => {
                  setCategory("Castle");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(true);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectCastle
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-3 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/castle.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Castle</span>
              </button>

              <button
                onClick={() => {
                  setCategory("Play");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(true);
                  setSelectTheTop(false);
                  setSelectTropical(false);
                }}
                className={
                  !selectPlay
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-4 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/play.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>Play</span>
              </button>
              <button
                onClick={() => {
                  setCategory("The Top");
                  setSelectAll(false);
                  setSelectBeachfront(false);
                  setSelectCastle(false);
                  setSelectIcon(false);
                  setSelectIsland(false);
                  setSelectMansion(false);
                  setSelectOMG(false);
                  setSelectPlay(false);
                  setSelectTheTop(true);
                  setSelectTropical(false);
                }}
                className={
                  !selectTheTop
                    ? "flex flex-col items-center justify-center hover:text-gray-700 hover:bg-gray-100 hover:px-3 hover:rounded-xl"
                    : "bg-gray-100 px-2 py-1 rounded-2xl flex flex-col items-center justify-center"
                }
              >
                <img
                  src="/top.jpg"
                  alt="icon"
                  className="size-5 brightness-0 hover:brightness-200"
                ></img>
                <span>The Top</span>
              </button>
            </div>
          </div>

          {/* <Link
            to={user ? "/account" : "/login"}
            className="flex mr-3 items-center gap-2 border border-gray-300 rounded-full py-2 px-4 h-12"
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
            {!!user && <div>{user.name}</div>}
          </Link> */}

          <Dropdown
            id="login"
            title={!!user && <div>{user.name}</div>}
            data={[
              { id: "1", name: "Minni" },
              { id: "2", name: "Mickey" },
            ]}
            // user={!!user}
            hasImage={false}
            style="bg-purple-800"
            onSelect={handleSelect}
          />
        </header>

        <div className="mt-8 grid gap-x-6 gap-y-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link to={"/place/" + place._id}>
                <div>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex ">
                    {place.addedPhotos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={place.addedPhotos?.[0]}
                        alt=""
                      />
                    )}
                  </div>
                  <h3 className="font-bold ">{place.address}</h3>
                  <h2 className="text-sm text-gray-500 ">{place.title}</h2>
                  <div className="mt-1">
                    <span className="font-bold">${place.price} </span> per night
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* <IndexPage continent={continent} /> */}
    </>
  );
}
