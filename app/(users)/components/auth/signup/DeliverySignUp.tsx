"use client";

import {
  clearMessages,
  openModal,
  setError,
  setSignupStep1Data,
} from "@/app/(users)/store/authSlice";
import { useState } from "react";
import { SignupStep1Data } from "@/app/(users)/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import Input from "@/app/(users)/components/ui/Input";
import Button from "@/app/(users)/components/ui/Button";
import GoogleButton from "@/app/(users)/components/ui/GoogleButton";
import AlertMessage from "@/app/(users)/components/ui/AlertMessage";
import FormGroup from "@/app/(users)/components/ui/FormGroup";

const DeliverySignUp = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName:   "",
    lastName:    "",
    email:       "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearMessages());
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      dispatch(setError("Please enter your first and last name."));
      return;
    }

    const step1Data: SignupStep1Data = {
      fullName:    `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email:       formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
    };

    dispatch(setSignupStep1Data({ type: "delivery", data: step1Data }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-center unageo text-[1.25rem] md:text-[1.5rem] font-medium leading-[2rem] md:w-[21.25rem] text-[#616161]">
        Signup as a user to start making deliveries
      </h1>
      <form
        onSubmit={handleContinue}
        className="flex w-full flex-col items-start gap-2 md:gap-4"
      >
        <FormGroup>
          <div className="flex gap-3 w-full">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="John"
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Doe"
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
            placeholder="example@gmail.com"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={isLoading}
            required
            placeholder="+2348012345678"
            helperText="International format e.g. +2348012345678"
          />
        </FormGroup>

        {error && <AlertMessage type="error" message={error} />}

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={
            !formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.email.trim() ||
            !formData.phoneNumber.trim() ||
            isLoading
          }
        >
          Continue
        </Button>

        <GoogleButton />
      </form>

      <div className="flex p-[0.1rem] items-center gap-[0.1rem] mt-6">
        <p className="unageo-regular text-[0.875rem] md:text-[1rem] md:leading-[1.5rem] leading-[0.9rem]">
          Already have an account?
        </p>
        <button
          onClick={() => dispatch(openModal("signin"))}
          className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[1.25rem] md:leading-[1.5rem] underline cursor-pointer"
        >
          Login
        </button>
      </div>

      <p className="unageo-regular text-[#808080] text-center md:text-[0.875rem] md:leading-[1.25rem] mb-4">
        By proceeding, you consent to get calls, WhatsApp or SMS messages,
        including by automated means, from DispatchHub and its affiliates to the
        number provided.
      </p>
    </div>
  );
};

export default DeliverySignUp;