import { useFlightFormStore } from "../../../store/useFlightFormStore";

export const UserData = () => {
  const data = useFlightFormStore((state) => state.formData);
  console.log("Zustand data:", data);

  return null;
  
};


