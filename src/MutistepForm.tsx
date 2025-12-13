import { useCallback, useState, useMemo, memo } from "react";
import Stepper from "./Stepper";
import useLocalStorage from "./useLocalStorage";

// Validation rules per step
const validateStep = (step: number, data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (step === 1) {
    if (!data.name.trim()) errors.push("Name is required");
    if (data.name.trim().length < 2) errors.push("Name must be at least 2 characters");
    
    if (!data.email.trim()) errors.push("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) errors.push("Invalid email format");
  }

  if (step === 2) {
    if (!data.address.trim()) errors.push("Address is required");
    if (data.address.trim().length < 5) errors.push("Address must be at least 5 characters");
    
    if (!data.phone.trim()) errors.push("Phone is required");
    const phoneRegex = /^[0-9]{10,15}$/;
    if (data.phone && !phoneRegex.test(data.phone.replace(/\D/g, ""))) {
      errors.push("Phone must be 10-15 digits");
    }
  }

  if (step === 3) {
    if (!data.age) errors.push("Age is required");
    const ageNum = parseInt(data.age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      errors.push("Age must be between 1 and 120");
    }
    
    if (!data.gender.trim()) errors.push("Gender is required");
  }

  return { isValid: errors.length === 0, errors };
};

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
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Memoize validation result for current step
  const validation = useMemo(() => validateStep(step, formData), [step, formData]);

  const prevHandler = useCallback(() => {
    setErrors([]);
    setStep(s => Math.max(1, s - 1));
  }, []);

  const nextHandler = useCallback(() => {
    const validation = validateStep(step, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors([]);
    setStep(s => Math.min(4, s + 1));
  }, [step, formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  }, [setFormData, errors.length]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("Submitting form", formData);
    alert("✅ Form submitted successfully! Check console for payload.");
    // Reset form after submit
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      age: "",
      gender: "",
    });
    setStep(1);
    setErrors([]);
    setTouched({});
  }, [formData, setFormData]);

  // Progress percentage for visual feedback
  const progress = useMemo(() => ((step - 1) / 3) * 100, [step]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      {/* Progress bar */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span>Step {step} of 4</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div style={{ width: "100%", height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px" }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#4caf50", borderRadius: "4px", transition: "width 0.3s" }} />
        </div>
      </div>

      <Stepper 
        step={step} 
        data={formData} 
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />

      {/* Error display */}
      {errors.length > 0 && (
        <div style={{ marginTop: "12px", padding: "12px", backgroundColor: "#ffebee", border: "1px solid #ef5350", borderRadius: "4px" }}>
          <strong>⚠️ Please fix the following errors:</strong>
          <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px" }}>
            {errors.map((error, idx) => (
              <li key={idx} style={{ color: "#c62828" }}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "8px", justifyContent: "space-between" }}>
        <button 
          onClick={prevHandler} 
          disabled={step === 1}
          style={{ padding: "10px 20px", cursor: step === 1 ? "not-allowed" : "pointer", opacity: step === 1 ? 0.5 : 1 }}
        >
          ← Prev
        </button>
        {step < 4 && (
          <button 
            onClick={nextHandler}
            style={{ padding: "10px 20px", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Next →
          </button>
        )}
        {step === 4 && (
          <button 
            onClick={handleSubmit}
            style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            ✓ Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(MutistepForm)
