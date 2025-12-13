import type React from "react";
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
};

const Stepper = ({ step, data, onChange }: StepperProps) => {
    return (
        <div className="">
            Current step of form {step}

            {step === 1 && <>
                <input
                    title="Name"
                    className="inputForm"
                    type="text"
                    name="name"
                    placeholder="Type your name..."
                    value={data.name}
                    onChange={onChange}
                />

                <label className="labelTitle" title="Email" />
                <input
                    className="inputForm"
                    type="email"
                    name="email"
                    placeholder="Type your email..."
                    value={data.email}
                    onChange={onChange}
                />
            </>}

            {step === 2 && <>
                <label className="labelTitle" title="Adress" />
                <input
                    className="inputForm"
                    name="address"
                    type="text"
                    placeholder="Type your address..."
                    value={data.address}
                    onChange={onChange}
                />

                <label className="labelTitle" title="phone" />
                <input
                    className="inputForm"
                    name="phone"
                    type="tel"
                    placeholder="Type your number..."
                    value={data.phone}
                    onChange={onChange}
                />
            </>}

            {step === 3 && <>
                <label className="labelTitle" title="age" />
                <input
                    className="inputForm"
                    name="age"
                    type="number"
                    placeholder="Type your age..."
                    value={data.age}
                    onChange={onChange}
                />

                <label className="labelTitle" title="gender" />
                <input
                    className="inputForm"
                    name="gender"
                    type="text"
                    placeholder="Type your gender..."
                    value={data.gender}
                    onChange={onChange}
                />
            </>}

            {step === 4 && <>
                <p>Are sure to submit the form ???</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </>}

        </div>
    )
}

export default Stepper
