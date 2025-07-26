// -----------------------------
// Basic Types & Shared Interfaces
// -----------------------------

// Validation rules applicable to form fields
export interface ValidationRule {
  type: 'required' | 'minLength';
  value?: number;
  message: string;
}

// For fields like dropdowns or selects
export interface Option {
  value: string;
  label: string;
}

// Represents the dynamic state of form data
export type FormState = Record<string, any>;

// Define action types for reducer FormAction
export type FormAction = {
  type: "UPDATE_FIELD";
  field: string;
  value: any;
};

// -----------------------------
// Schema Definitions
// -----------------------------

// Represents an individual form field and its configuration
export interface FieldSchema {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'textarea' | 'email';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Option[];
  validation?: ValidationRule[];
  dependsOn?: {
    fieldId: string;
    condition: 'equals';
    value: string;
  };
}

// Overall structure of the form, including fields and submit button config
export interface FormSchema {
  title: string;
  fields: FieldSchema[];
  submitButton: {
    text: string;
    loadingText: string;
  };
}

// -----------------------------
// Component Props
// -----------------------------

// Props for the Field component
export interface FieldComponentProps {
  field: FieldSchema;
  value: any;
  onChange: (val: any) => void;
  error?: string;
}

// Props for the FormRenderer component
export interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: FormState) => void;
}
