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
import { newLead } from "@/utils/actions";
import { Lead } from "./LeadList";

import "./NewLeadForm.css";

const styleContextValue = {
  styles: [
    {
      name: "vertical.layout",
      classNames: ["lead__form-container"],
    },
    {
      name: "control.input",
      classNames: ["lead__input"],
    },
  ],
};

const NewLeadForm = () => {
  const [data, setData] = useState<Omit<Lead, "date" | "status"> | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formdata", data);
    newLead(data);
    router.push("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit} className="lead__form">
      <JsonFormsStyleContext.Provider value={styleContextValue}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={vanillaRenderers}
          onChange={({ data }) => setData(data)}
          config={{
            restrict: true,
            trim: false,
            showUnfocusedDescription: true,
            hideRequiredAsterisk: true,
          }}
          cells={vanillaCells}
        />
        <button type="submit" className="lead__btn-submit">
          Submit
        </button>
      </JsonFormsStyleContext.Provider>
    </form>
  );
};

export default NewLeadForm;
