"use client";

import {
  vanillaCells,
  vanillaRenderers,
  JsonFormsStyleContext,
} from "@jsonforms/vanilla-renderers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import schema from "@/config/schema.json";
import uischema from "@/config/uischema.json";
import "./NewLeadForm.css";

const styleContextValue = {
  styles: [
    {
      name: "vertical.layout",
      classNames: ["form_assesment"],
    },
  ],
};

const NewLeadForm = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push("/thank-you");
  };
  return (
    <JsonFormsStyleContext.Provider value={styleContextValue}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={vanillaRenderers}
        onChange={({ data }) => setFormData(data)}
        config={{
          restrict: true,
          trim: false,
          showUnfocusedDescription: true,
          hideRequiredAsterisk: true,
        }}
        cells={vanillaCells}
      />

      <button type="submit">Submit</button>
    </JsonFormsStyleContext.Provider>
  );
};

export default NewLeadForm;
