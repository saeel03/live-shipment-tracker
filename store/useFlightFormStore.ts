import {create} from "zustand";

 export interface FlightFormData {

    id: string;
  company: string;
  shipmentId: string;
  origin: string;
  destination: string; 
}

interface FlightFormStore{
    formData: FlightFormData | null;
    setFormData:( data : FlightFormData)=> void
}

export const useFlightFormStore = create<FlightFormStore>((set)=>({
    formData: null,
    setFormData: (data) => set({formData: data}),
}));