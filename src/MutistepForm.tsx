import { useCallback, useState } from "react";
import Stepper from "./Stepper";
import useLocalStorage from "./useLocalStorage";

const MutistepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useLocalStorage("multistep-form", {
    name: "",
    email: "",
    address: "",
    phone: "",
    age: "",
    gender: "",
  });

  const prevHandler = useCallback(() => {
    setStep(s => Math.max(1, s - 1));
  }, []);

  const nextHandler = useCallback(() => {
    setStep(s => Math.min(4, s + 1));
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, [setFormData]);

  const handleSubmit = useCallback(() => {
    console.log("Submitting form", formData);
    alert("Form submitted! Check console for payload.");
  }, [formData]);

  return (
    <div>
      <Stepper step={step} data={formData} onChange={handleChange} />

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <button onClick={prevHandler} disabled={step === 1}>Prev</button>
        {step < 4 && <button onClick={nextHandler}>Next</button>}
        {step === 4 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  )
}

export default MutistepForm
