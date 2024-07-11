import { Link } from "react-router-dom";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AltHeader from "../AltHeader";

export default function IndexPage({ continent }) {
  const [places, setPlaces] = useState([]);
  const params = {};
  if (continent) {
    params["continent"] = continent;
  }

  useEffect(() => {
    axios.get("/places", { params: params }).then((response) => {
      console.log(response);
      setPlaces(response.data);
    });
  }, []);
  return (
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
  );
}
