import React, { createContext, useContext, useEffect, useState } from "react";

interface LocationContextProps {
  countries: { name: string; code: string }[];
  states: { name: string; code: string }[];
  cities: { name: string; code: string }[];
  fetchStates: (countryCode: string) => void;
  fetchCities: (stateCode: string) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([]);
  const [states, setStates] = useState<{ name: string; code: string }[]>([]);
  const [cities, setCities] = useState<{ name: string; code: string }[]>([]);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryList = data.map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
      }));
      setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
    };

    fetchCountries();
  }, []);

  // Fetch states/provinces from GeoDB Cities API
  const fetchStates = async (countryCode: string) => {
    if (!countryCode) return;
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`,
      {
        headers: {
          "X-RapidAPI-Key": "23f7ff1c04mshf89c4f8e9e2cd21p11fbc2jsn19be925cf2ed",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    const stateList = data.data.map((state: any) => ({
      name: state.name,
      code: state.code,
    }));
    setStates(stateList.sort((a, b) => a.name.localeCompare(b.name)));
  };

  // Fetch cities from GeoDB Cities API
  const fetchCities = async (stateCode: string) => {
    if (!stateCode) return;
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/regions/${stateCode}/cities`,
      {
        headers: {
          "X-RapidAPI-Key": "23f7ff1c04mshf89c4f8e9e2cd21p11fbc2jsn19be925cf2ed",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    const cityList = data.data.map((city: any) => ({
      name: city.name,
      code: city.id,
    }));
    setCities(cityList.sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <LocationContext.Provider
      value={{ countries, states, cities, fetchStates, fetchCities }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};