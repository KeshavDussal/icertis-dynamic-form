import { useReducer, useState } from "react";
import type { FieldSchema, FormRendererProps, FormState } from "../types";
import Field from "./Field";
import validate from "../utils/validate";

// Reducer function to manage form state updates instead of using useState
const formReducer = (
  state: FormState,
  action: { type: "UPDATE_FIELD"; field: string; value: any }
): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const FormRenderer = ({ schema, onSubmit }: FormRendererProps) => {
  const [formState, dispatch] = useReducer(formReducer, {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handles change for individual fields and dispatches updates
  const handleChange = (fieldId: string, value: any) => {
    dispatch({ type: "UPDATE_FIELD", field: fieldId, value });
  };

  // Checks if a field should be visible based on dependency
  const isFieldVisible = (field: FieldSchema): boolean => {
    const dependency = field.dependsOn;
    if (!dependency) return true;
    return formState[dependency.fieldId] === dependency.value;
  };

  // Handles form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(schema.fields, formState);
    setErrors(validationErrors);

    // If no validation errors, call the onSubmit handler
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{schema.title}</h2>

      {schema.fields.map((field) =>
        isFieldVisible(field) ? (
          <Field
            key={field.id}
            field={field}
            value={formState[field.id]}
            onChange={(val) => handleChange(field.id, val)}
            error={errors[field.id]}
          />
        ) : null
      )}

      <button type="submit">{schema.submitButton.text}</button>
    </form>
  );
};

export default FormRenderer;
