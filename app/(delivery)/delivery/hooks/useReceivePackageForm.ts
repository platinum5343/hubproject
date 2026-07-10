import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  nextPackageForm,
  nextStep,
  prevPackageForm,
  prevStep,
  savePackageDetails,
} from "../store/mapSlice";

export const useReceivePackageForm = () => {
  const dispatch = useAppDispatch();
  const {
    deliveryLocation,
    additionalStops,
    currentPackageFormIndex,
    packageDetails,
  } = useAppSelector((state) => state.map);

  // Form state
  const [description, setDescription] = useState("");
  const [numberOfPackages, setNumberOfPackages] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [preferredVehicle, setPreferredVehicle] = useState<
    "bike" | "car" | null
  >(null);

  // Calculate stop information
  const hasMultipleStops = additionalStops.length > 0;
  const totalStops = hasMultipleStops ? additionalStops.length + 1 : 1;
  const isLastStop = currentPackageFormIndex === totalStops - 1;

  //Get current stop details
  const getCurrentStopInfo = () => {
    if (currentPackageFormIndex === 0) {
      return {
        stopId: "main",
        location: deliveryLocation || "",
        label: hasMultipleStops ? "Initial Pick-up" : "Pick-up Location",
      };
    } else {
      const stop = additionalStops[currentPackageFormIndex - 1];
      return {
        stopId: stop.id,
        location: stop.location,
        label: `Pick-up Stop ${currentPackageFormIndex}`,
      };
    }
  };

  const currentStop = getCurrentStopInfo();

  //Load existing data when switching between forms
  useEffect(() => {
    const existingDetails = packageDetails.find(
      (pd: { stopId: string; description: string; numberOfPackages: string; receiverName: string; receiverPhone: string; preferredVehicle: 'bike' | 'car' | null }) => pd.stopId === currentStop.stopId,
    );

    if (existingDetails) {
      setDescription(existingDetails.description);
      setNumberOfPackages(existingDetails.numberOfPackages);
      setSenderName(existingDetails.receiverName);
      setSenderPhone(existingDetails.receiverPhone);
      setPreferredVehicle(existingDetails.preferredVehicle);
    } else {
      // Reset form for new stop
      setDescription("");
      setNumberOfPackages("");
      setSenderName("");
      setSenderPhone("");
      setPreferredVehicle(null);
    }
  }, [currentPackageFormIndex, currentStop.stopId, packageDetails]);

  // Form validation
  const validateForm = () => {
    if (
      !description.trim() ||
      !numberOfPackages.trim() ||
      !senderName.trim() ||
      !senderPhone.trim()
    ) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };

  // Save package details to Redux
  const saveCurrentForm = () => {
    dispatch(
      savePackageDetails({
        stopId: currentStop.stopId,
        description,
        numberOfPackages,
        receiverName: senderName,
        receiverPhone: senderPhone,
        preferredVehicle,
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    saveCurrentForm();

    // Navigate to next form or step
    if (isLastStop) {
      dispatch(nextStep());
    } else {
      dispatch(nextPackageForm());
    }
  };

  // Handle back navigation
  const handleBack = () => {
    saveCurrentForm();
    dispatch(prevPackageForm());
  };

  // Handle previous step
  const handlePrevStep = () => {
    dispatch(prevStep());
  };

  return {
    // State
    description,
    numberOfPackages,
    senderName,
    senderPhone,
    preferredVehicle,
    currentStop,
    hasMultipleStops,
    totalStops,
    currentPackageFormIndex,

    // Setters
    setDescription,
    setNumberOfPackages,
    setSenderName,
    setSenderPhone,
    setPreferredVehicle,

    // Handlers
    handleSubmit,
    handleBack,
    handlePrevStep,
  };
};