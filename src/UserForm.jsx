import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FormBuilder = () => {
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});

    const [emailError, setEmailError] = useState("");

    const countryOptions = [
        { code: "us", name: "United States" },
        { code: "gb", name: "United Kingdom" },
        { code: "pk", name: "Pakistan" },
        { code: "in", name: "India" },
        { code: "de", name: "Germany" },
        { code: "fr", name: "France" },
        { code: "cn", name: "China" },
        { code: "au", name: "Australia" }
    ];

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const renderFormattedData = (data) => {
        return Object.keys(data).map((key) => {
            const value = data[key];
            let fieldName = key.replace("_", " ").replace("-", " ").toUpperCase();

            if (fieldName === "BACHELORS") fieldName = "Bachelors";
            if (fieldName === "MASTERS") fieldName = "Masters";

            return (
                <div key={key} className="mb-2">
                    <strong>{fieldName}:</strong> {value || "Not provided"}
                </div>
            );
        });
    };

    const addField = (type) => {
        const fieldName = type.charAt(0).toUpperCase() + type.slice(1);
        setFields([...fields, { id: Date.now(), type, name: fieldName }]);
    };

    const handleChange = (fieldName, value) => {
        if (fieldName === "email") {
            setEmailError(validateEmail(value) ? "" : "Invalid email format");
        }
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const renderFields = (fields) => {
        return fields.map((field) => (
            <div key={field.id} className="mb-3 p-3 border rounded bg-light">
                {field.type === "name" && (
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                )}
                {field.type === "email" && (
                    <div>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) => handleChange("email", e.target.value)}
                        />

                        {emailError && <small className="text-danger">{emailError}</small>}
                    </div>
                )}
                {field.type === "dropdown" && (
                    <select className="form-select" onChange={(e) => handleChange("Program", e.target.value)}>
                        <option value="">Select Study Level</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                    </select>
                )}
                {field.type === "country" && (
                    <select
                        className="form-select"
                        onChange={(e) => handleChange("country", e.target.value)}
                    >
                        <option value="">Select Country</option>
                        {countryOptions.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                )}
                {field.type === "phone" && (
                    <PhoneInput
                        country={formData.country || "us"}
                        containerClass="w-100"
                        inputClass="form-control"
                        onChange={(value) => handleChange("Phone Number", value)}
                    />
                )}
                {field.type === "file" && (
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleChange("File", e.target.files[0].name)}
                    />
                )}
                {field.type === "date" && (
                    <input
                        type="date"
                        className="form-control"
                        onChange={(e) => handleChange("Date", e.target.value)}
                    />
                )}
                {field.type === "experience" && (
                    <div>
                        <label className="form-label me-3">Do you have professional experience?</label>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`qual-${field.id}`}
                                value="yes"
                                onChange={(e) => handleChange("Experience", e.target.value)}
                            />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`qual-${field.id}`}
                                value="no"
                                onChange={(e) => handleChange("Experience", e.target.value)}
                            />
                            <label className="form-check-label">No</label>
                        </div>
                        {formData[field.id] === "yes" && (
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Enter your qualification"
                                onChange={(e) => handleChange(`${field.id}-experience`, e.target.value)}
                            />
                        )}
                    </div>

                )}
                {field.type === "nested" && (
                    <div className="nested-section border p-3 mt-2">
                        <h5>Nested Section</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => addFieldToSection(field.id, "text")}>
                            Add Nested Text
                        </button>
                        {renderFields(field.subFields)}
                    </div>
                )}

                {field.type === "dropdown" && formData.Program && (
                    <div className="mt-2">
                        {formData.Program === "bachelors" && (
                            <>
                                <input className="form-control mb-2" type="text" placeholder="University Name"
                                       onChange={(e) => handleChange(`university`, e.target.value)}/>
                                <input className="form-control mb-2" type="text" placeholder="Batch Name"
                                       onChange={(e) => handleChange(`batch`, e.target.value)} />
                                <input className="form-control mb-2" type="text" placeholder="Subject" onChange={(e) => handleChange(`subject`, e.target.value)} />
                            </>
                        )}
                        {formData.Program === "masters" && (
                            <>
                                <input className="form-control mb-2" type="text" placeholder="University Name" onChange={(e) => handleChange(`uni`, e.target.value)} />
                                <input className="form-control mb-2" type="text" placeholder="Batch Name" onChange={(e) => handleChange(`batch`, e.target.value)} />
                                <input className="form-control mb-2" type="text" placeholder="Specialization" onChange={(e) => handleChange(`specialization`, e.target.value)} />
                            </>
                        )}
                    </div>
                )}
            </div>
        ));
    };

    const addFieldToSection = (parentId, type) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === parentId
                    ? { ...field, subFields: [...field.subFields, { id: Date.now(), type }] }
                    : field
            )
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Dynamic Form Builder</h2>
            <div className="mb-3">
                <button className="btn btn-primary me-2" onClick={() => addField("name")}>Add Name</button>
                <button className="btn btn-primary me-2" onClick={() => addField("email")}>Add Email</button>
                <button className="btn btn-primary me-2" onClick={() => addField("dropdown")}>Add Dropdown</button>
                <button className="btn btn-primary me-2" onClick={() => addField("country")}>Add Country</button>
                <button className="btn btn-primary me-2" onClick={() => addField("phone")}>Add Phone</button>
                <button className="btn btn-primary me-2" onClick={() => addField("date")}>Add Date</button>
                <button className="btn btn-primary me-2" onClick={() => addField("file")}>Add File Upload</button>
                <button className="btn btn-primary me-2" onClick={() => addField("experience")}>Add Experience
                    Confirmation
                </button>
            </div>
            <div>{renderFields(fields)}</div>
            <h3 className="mt-4">Form Data</h3>
            <div className="bg-light p-3 border rounded">
                {renderFormattedData(formData)}
            </div>
        </div>
    );
};

export default FormBuilder;
