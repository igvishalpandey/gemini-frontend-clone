import toast from "react-hot-toast";
import type { Country } from "../types";

const RESTCOUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2";

const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(RESTCOUNTRIES_URL);

    if (!response.ok) {
      toast.error("Failed to fetch country data");
      throw new Error("Failed to fetch country data");
    }

    const data = await response.json();

    const validCountries = data
      .filter(
        (country: Country) =>
          country.idd?.root && country.idd.suffixes?.length > 0
      )

    return validCountries;
  } catch (error: any) {
    toast.error(error.message || "Failed to load countries");
    throw error;
  }
};

const getDefaultCountryCode = (countries: Country[]): string => {
  const india = countries.find((country) => country.cca2 === "IN");
  return india ? `${india.idd.root}${india.idd.suffixes[0]}` : "+91";
};

export { fetchCountries, getDefaultCountryCode };
