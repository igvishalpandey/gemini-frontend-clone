import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Country } from "../../types";
import { fetchCountries, getDefaultCountryCode } from "../../services";
import { PhoneInput } from "../../components";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ROUTES, TOAST_MESSAGES } from "../../constant";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../store/Slices/authSlice";

interface FormData {
  countryCode: string;
  phoneNumber: string;
}

const phoneSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(5, "Phone number must be at least 5 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^\d+$/, "Only numbers allowed"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: "+91",
      phoneNumber: "",
    },
  });

  const loadCountries = useCallback(async () => {
    try {
      const data = await fetchCountries();
      setCountries(data || []);
      if (data && data.length) {
        reset({
          countryCode: getDefaultCountryCode(data),
          phoneNumber: "",
        });
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_LOAD_COUNTRIES);
      console.error(TOAST_MESSAGES.ERROR_LOAD_COUNTRIES, error);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    loadCountries();
  }, []);

  const onSubmit = useCallback(
    (data: FormData) => {
      setLoading(true);
      const fullPhone = `${data.countryCode}${data.phoneNumber}`;
      toast.success(TOAST_MESSAGES.OTP_SENT_SUCCESS);
      setTimeout(() => {
        toast.success(TOAST_MESSAGES.SIGNUP_SUCCESS);
        dispatch(login(fullPhone));
        setLoading(false);
      }, 1500);
    },
    [dispatch]
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-800 rounded-3xl p-10 shadow-xl transition-colors duration-300">
        <h2 className="text-4xl font-extrabold text-center mb-3 text-gray-900 dark:text-gray-100">
          Signup your account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-200 mb-8">
          Enter your phone number to signup.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <PhoneInput
              control={control}
              countries={countries}
              loading={loading}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold hover:cursor-pointer disabled:cursor-not-allowed"
            >
              Signup
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
          already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="text-blue-600 hover:text-blue-800 font-semibold transition"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
