import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";

import FormRenderer from "./components/FormRenderer";
import type { FormSchema } from "./types";
import { capitalize } from "./utils/captitilize";

function App() {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch form schema on mount
  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await axios.get<FormSchema>(
          "https://sharejson.com/api/v1/uzjxOUc_5VccqT-1XiEYf"
        );
        setSchema(response.data);
      } catch (err) {
        console.error("Failed to load form schema:", err);
        setError("Failed to load the form. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="full-page-loader">
        <div className="spinner" />
        <p>Loading form...</p>
      </div>
    );
  }

  // Render error state
  if (error || !schema) {
    return (
      <div className="full-page-loader">
        <p style={{ color: "red" }}>{error ?? "Form schema not available."}</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="heading">Icertis Dynamic Form Builder</h1>
      </header>

      <main className="container">
        {/* Form Section */}
        <section className="column left-column">
          <FormRenderer schema={schema} onSubmit={setSubmittedData} />
        </section>

        {/* Submitted Data Section */}
        <aside className="column right-column">
          <h2>Submitted Data</h2>
          {submittedData ? (
            <div className="submitted-data-card">
              <h3 className="form-submission-summary-text">
                Form Submission Summary
              </h3>
              <div className="data-list">
                {Object.entries(submittedData).map(([key, value]) => (
                  <div className="data-item" key={key}>
                    <span className="label">{capitalize(key)}</span>
                    <span className="value">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ color: "#666", fontStyle: "italic" }}>
              No data submitted yet.
            </p>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
