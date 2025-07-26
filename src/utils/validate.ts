import type { FieldSchema, FormState } from '../types';

const validate = (fields: FieldSchema[], data: FormState): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Iterate over each field to apply validation
  for (const field of fields) {
    const value = data[field.id];

    // Check for required fields
    if (field.required && (value === undefined || value === '')) {
      errors[field.id] = `${field.label} is required`;
      continue; // Skip further validation if required check fails
    }

    // Apply custom validation rules if present
    if (field.validation) {
      for (const rule of field.validation) {
        // Handle minLength validation
        if (rule.type === 'minLength' && value.length < (rule.value || 0)) {
          errors[field.id] = rule.message;
        }
      }
    }
  }

  return errors; // Return collected validation errors
};

export default validate;
