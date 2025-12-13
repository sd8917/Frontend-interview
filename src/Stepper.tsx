import type React from "react";
import { memo } from "react";
import './form.css'

type StepperProps = {
    step: number;
    data: {
        name: string;
        email: string;
        address: string;
        phone: string;
        age: string;
        gender: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    errors: string[];
    touched: Record<string, boolean>;
};

const Stepper = ({ step, data, onChange, onBlur, errors, touched }: StepperProps) => {
    const hasError = errors.length > 0;

    return (
        <div className="" style={{ padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#fafafa" }}>
            <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
                {step === 1 && "📝 Personal Information"}
                {step === 2 && "📍 Contact Details"}
                {step === 3 && "👤 Additional Info"}
                {step === 4 && "✅ Review & Submit"}
            </h3>

            {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Name *</label>
                        <input
                            className="inputForm"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={data.name}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            style={{ border: touched.name && !data.name ? "1px solid #ef5350" : "1px solid #ccc" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Email *</label>
                        <input
                            className="inputForm"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={data.email}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            style={{ border: touched.email && !data.email ? "1px solid #ef5350" : "1px solid #ccc" }}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Address *</label>
                        <input
                            className="inputForm"
                            name="address"
                            type="text"
                            placeholder="Street address, city, state"
                            value={data.address}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            style={{ border: touched.address && !data.address ? "1px solid #ef5350" : "1px solid #ccc" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Phone Number *</label>
                        <input
                            className="inputForm"
                            name="phone"
                            type="tel"
                            placeholder="1234567890"
                            value={data.phone}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            style={{ border: touched.phone && !data.phone ? "1px solid #ef5350" : "1px solid #ccc" }}
                        />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Age *</label>
                        <input
                            className="inputForm"
                            name="age"
                            type="number"
                            placeholder="25"
                            value={data.age}
                            onChange={onChange}
                            onBlur={onBlur}
                            min="1"
                            max="120"
                            required
                            style={{ border: touched.age && !data.age ? "1px solid #ef5350" : "1px solid #ccc" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Gender *</label>
                        <input
                            className="inputForm"
                            name="gender"
                            type="text"
                            placeholder="Male/Female/Other"
                            value={data.gender}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            style={{ border: touched.gender && !data.gender ? "1px solid #ef5350" : "1px solid #ccc" }}
                        />
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    <p style={{ marginBottom: "20px", fontSize: "16px" }}>Please review your information before submitting:</p>
                    <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "4px", border: "1px solid #e0e0e0" }}>
                        <div style={{ marginBottom: "12px" }}>
                            <strong>Name:</strong> {data.name || <em style={{ color: "#999" }}>Not provided</em>}
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <strong>Email:</strong> {data.email || <em style={{ color: "#999" }}>Not provided</em>}
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <strong>Address:</strong> {data.address || <em style={{ color: "#999" }}>Not provided</em>}
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <strong>Phone:</strong> {data.phone || <em style={{ color: "#999" }}>Not provided</em>}
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <strong>Age:</strong> {data.age || <em style={{ color: "#999" }}>Not provided</em>}
                        </div>
                        <div>
                            <strong>Gender:</strong> {data.gender || <em style={{ color: "#999" }}>Not provided</em>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Stepper)
