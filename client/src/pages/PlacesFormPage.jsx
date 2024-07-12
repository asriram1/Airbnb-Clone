import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect } from "react";
import Select from "react-select";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [continent, setContinent] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [category, setCategory] = useState("");

  const continents = {
    AD: "Europe",
    AE: "Asia",
    AF: "Asia",
    AG: "North America",
    AI: "North America",
    AL: "Europe",
    AM: "Asia",
    AN: "North America",
    AO: "Africa",
    AQ: "Antarctica",
    AR: "South America",
    AS: "Australia",
    AT: "Europe",
    AU: "Australia",
    AW: "North America",
    AZ: "Asia",
    BA: "Europe",
    BB: "North America",
    BD: "Asia",
    BE: "Europe",
    BF: "Africa",
    BG: "Europe",
    BH: "Asia",
    BI: "Africa",
    BJ: "Africa",
    BM: "North America",
    BN: "Asia",
    BO: "South America",
    BR: "South America",
    BS: "North America",
    BT: "Asia",
    BW: "Africa",
    BY: "Europe",
    BZ: "North America",
    CA: "North America",
    CC: "Asia",
    CD: "Africa",
    CF: "Africa",
    CG: "Africa",
    CH: "Europe",
    CI: "Africa",
    CK: "Australia",
    CL: "South America",
    CM: "Africa",
    CN: "Asia",
    CO: "South America",
    CR: "North America",
    CU: "North America",
    CV: "Africa",
    CX: "Asia",
    CY: "Asia",
    CZ: "Europe",
    DE: "Europe",
    DJ: "Africa",
    DK: "Europe",
    DM: "North America",
    DO: "North America",
    DZ: "Africa",
    EC: "South America",
    EE: "Europe",
    EG: "Africa",
    EH: "Africa",
    ER: "Africa",
    ES: "Europe",
    ET: "Africa",
    FI: "Europe",
    FJ: "Australia",
    FK: "South America",
    FM: "Australia",
    FO: "Europe",
    FR: "Europe",
    GA: "Africa",
    GB: "Europe",
    GD: "North America",
    GE: "Asia",
    GF: "South America",
    GG: "Europe",
    GH: "Africa",
    GI: "Europe",
    GL: "North America",
    GM: "Africa",
    GN: "Africa",
    GP: "North America",
    GQ: "Africa",
    GR: "Europe",
    GS: "Antarctica",
    GT: "North America",
    GU: "Australia",
    GW: "Africa",
    GY: "South America",
    HK: "Asia",
    HN: "North America",
    HR: "Europe",
    HT: "North America",
    HU: "Europe",
    ID: "Asia",
    IE: "Europe",
    IL: "Asia",
    IM: "Europe",
    IN: "Asia",
    IO: "Asia",
    IQ: "Asia",
    IR: "Asia",
    IS: "Europe",
    IT: "Europe",
    JE: "Europe",
    JM: "North America",
    JO: "Asia",
    JP: "Asia",
    KE: "Africa",
    KG: "Asia",
    KH: "Asia",
    KI: "Australia",
    KM: "Africa",
    KN: "North America",
    KP: "Asia",
    KR: "Asia",
    KW: "Asia",
    KY: "North America",
    KZ: "Asia",
    LA: "Asia",
    LB: "Asia",
    LC: "North America",
    LI: "Europe",
    LK: "Asia",
    LR: "Africa",
    LS: "Africa",
    LT: "Europe",
    LU: "Europe",
    LV: "Europe",
    LY: "Africa",
    MA: "Africa",
    MC: "Europe",
    MD: "Europe",
    ME: "Europe",
    MG: "Africa",
    MH: "Australia",
    MK: "Europe",
    ML: "Africa",
    MM: "Asia",
    MN: "Asia",
    MO: "Asia",
    MP: "Australia",
    MQ: "North America",
    MR: "Africa",
    MS: "North America",
    MT: "Europe",
    MU: "Africa",
    MV: "Asia",
    MW: "Africa",
    MX: "North America",
    MY: "Asia",
    MZ: "Africa",
    NA: "Africa",
    NC: "Australia",
    NE: "Africa",
    NF: "Australia",
    NG: "Africa",
    NI: "North America",
    NL: "Europe",
    NO: "Europe",
    NP: "Asia",
    NR: "Australia",
    NU: "Australia",
    NZ: "Australia",
    OM: "Asia",
    PA: "North America",
    PE: "South America",
    PF: "Australia",
    PG: "Australia",
    PH: "Asia",
    PK: "Asia",
    PL: "Europe",
    PM: "North America",
    PN: "Australia",
    PR: "North America",
    PS: "Asia",
    PT: "Europe",
    PW: "Australia",
    PY: "South America",
    QA: "Asia",
    RE: "Africa",
    RO: "Europe",
    RS: "Europe",
    RU: "Europe",
    RW: "Africa",
    SA: "Asia",
    SB: "Australia",
    SC: "Africa",
    SD: "Africa",
    SE: "Europe",
    SG: "Asia",
    SH: "Africa",
    SI: "Europe",
    SJ: "Europe",
    SK: "Europe",
    SL: "Africa",
    SM: "Europe",
    SN: "Africa",
    SO: "Africa",
    SR: "South America",
    ST: "Africa",
    SV: "North America",
    SY: "Asia",
    SZ: "Africa",
    TC: "North America",
    TD: "Africa",
    TF: "Antarctica",
    TG: "Africa",
    TH: "Asia",
    TJ: "Asia",
    TK: "Australia",
    TM: "Asia",
    TN: "Africa",
    TO: "Australia",
    TR: "Asia",
    TT: "North America",
    TV: "Australia",
    TW: "Asia",
    TZ: "Africa",
    UA: "Europe",
    UG: "Africa",
    US: "North America",
    UY: "South America",
    UZ: "Asia",
    VC: "North America",
    VE: "South America",
    VG: "North America",
    VI: "North America",
    VN: "Asia",
    VU: "Australia",
    WF: "Australia",
    WS: "Australia",
    YE: "Asia",
    YT: "Africa",
    ZA: "Africa",
    ZM: "Africa",
    ZW: "Africa",
  };

  const categoryMap = {
    Icon: 0,
    Island: 1,
    Beachfront: 2,
    Mansion: 3,
    Tropical: 4,
    Castle: 5,
    OMG: 6,
    Play: 7,
    "The Top": 8,
  };

  const categoryOptions = [
    { value: "Icon", label: "Icon" },
    { value: "Island", label: "Island" },
    { value: "Beachfront", label: "Beachfront" },
    { value: "Mansion", label: "Mansion" },
    { value: "Tropical", label: "Tropical" },
    { value: "Castle", label: "Castle" },
    { value: "OMG", label: "OMG" },
    { value: "Play", label: "Play" },
    { value: "The Top", label: "The Top" },
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "64px",
      color: "#08699B",
      fontSize: "14px",
      width: "100%",
      borderRadius: "16px",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#9CA3AF",
      };
    },
  };
  // function getContinent({ ev }) {
  //   // const location = location.split(",")[-1];
  //   // const instance = axios.create({
  //   //   baseURL: "https://maps.googleapis.com",
  //   //   withCredentials: false,
  //   // });
  //   // instance
  //   //   .get(
  //   //     "/maps/api/geocode/json?address=" +
  //   //       location +
  //   //       "&key=AIzaSyB5qBSS607LuIaj6nqhrZVZhi-w_fF_Q1k"
  //   //   )
  //   //   .then((res) =>
  //   //     console.log(res.data.results[0].address_components[0].short_name)
  //   //   );
  // }
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setCategory(data.category);
      setContinent(data.continent);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

  if (redirectToPlacesList && action !== "new") {
    return <Navigate to={"account/places"} />;
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function getContinent(address) {}
  async function savePlace(ev) {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      category,
      continent,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (address !== "") {
      // const result = await getContinent(address);
      let location = address.split(",");
      location = location[location.length - 1];
      console.log(location);
      const instance = axios.create({
        baseURL: "https://maps.googleapis.com",
        withCredentials: false,
      });
      instance
        .get(
          "/maps/api/geocode/json?address=" +
            location +
            "&key=" +
            import.meta.env.VITE_REACT_APP_GOOGLE_API
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.results[0].address_components[0].short_name);
          const countryCode =
            res.data.results[0].address_components[0].short_name;
          const continent = continents[countryCode];
          console.log(continent);
          setContinent(continent);
          placeData.continent = continent;
        });
    }

    if (id) {
      //update

      await axios.put("/places", {
        id,
        ...placeData,
      });

      setRedirect(true);
    } else {
      //new place

      setTimeout(() => {
        axios.post("/places", placeData).then((res) => console.log(res));
      }, 3000);

      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "title for your place. should be short and catchy as in advertisement."
          )}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title, for example: My Lovely Apt"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => {
              setAddress(ev.target.value);
            }}
            placeholder="address"
          />
          {preInput("Photos", "more = better")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "description of the place")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput("Category", "what sort of an accomodation is this?")}
          <div className="w-[380px]">
            <Select
              styles={colourStyles}
              onChange={(ev) => {
                setCategory(ev.value);
              }}
              value={categoryOptions[categoryMap[category]]}
              options={categoryOptions}
              placeholder="Select category"
              formatOptionLabel={(category) => (
                <span className="text-gray-400">{category.label}</span>
              )}
            />
          </div>
          {preInput("Perks", "select all the perks of your place")}
          <Perks selected={perks} onChange={setPerks} />
          {preInput("Extra Info", "house rules, etc")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            "Check in & out times, max guests",
            "add check in and out times, remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
