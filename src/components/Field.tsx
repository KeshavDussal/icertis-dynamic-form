import type { FieldComponentProps } from "../types";

const Field: React.FC<FieldComponentProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue =
      field.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    onChange(newValue);
  };

  const commonProps = {
    id: field.id,
    name: field.id,
    onChange: handleChange,
    className: "input",
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "number":
      case "date":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={value || ""}
            {...commonProps}
          />
        );

      case "select":
        return (
          <select value={value || ""} {...commonProps}>
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input type="checkbox" checked={Boolean(value)} {...commonProps} />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`field ${field.type === "checkbox" ? "checkbox-field" : ""}`}
    >
      <label htmlFor={field.id}>{field.label}</label>
      {renderField()}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Field;
