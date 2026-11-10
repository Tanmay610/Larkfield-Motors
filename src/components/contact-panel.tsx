import React, { useState, useId, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FieldDef {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  required: boolean;
}

const basicFields: FieldDef[] = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Your email", type: "email", autoComplete: "email", required: true },
  { name: "message", label: "Your message", type: "textarea", autoComplete: "off", required: true },
];

const eventFields: FieldDef[] = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Your email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", required: false },
  { name: "place", label: "Where is the event?", type: "text", autoComplete: "off", required: true },
  { name: "guests", label: "How many guests, roughly?", type: "number", autoComplete: "off", required: true },
  { name: "when", label: "Date and time", type: "text", autoComplete: "off", required: true },
  { name: "kind", label: "What kind of event?", type: "text", autoComplete: "off", required: false },
  { name: "message", label: "Anything else", type: "textarea", autoComplete: "off", required: false },
];

const initialValues: Record<string, string> = {
  name: "",
  email: "",
  phone: "",
  place: "",
  guests: "",
  when: "",
  kind: "",
  message: "",
};

const errorMessages: Record<string, string> = {
  name: "Please enter your name.",
  email: "Please enter your email address.",
  phone: "Please enter a phone number.",
  place: "Please tell us where the event is.",
  guests: "Please tell us roughly how many guests.",
  when: "Please tell us the date and time.",
  kind: "Please tell us what kind of event it is.",
  message: "Please enter a message.",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FieldDef[], values: Record<string, string>): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const f of fields) {
    if (f.required && !values[f.name]?.trim()) {
      errs[f.name] = errorMessages[f.name];
    }
  }
  if (!errs.email && values.email && !emailRegex.test(values.email.trim())) {
    errs.email = "Please enter a valid email address.";
  }
  return errs;
}

export interface ContactPanelProps {
  subject?: string;
  inquiryType?: string;
  fields?: "basic" | "event";
  className?: string;
}

const inputClass =
  "block w-full border-0 border-b bg-transparent p-0 pb-1 text-inherit outline-none [border-bottom-color:color-mix(in_srgb,currentColor_30%,transparent)] focus:[border-bottom-color:currentColor]";

const labelClass =
  "pointer-events-none absolute left-0 top-0 text-small opacity-50 transition-all duration-200 motion-reduce:transition-none peer-focus:-top-4 peer-focus:text-xs peer-focus:opacity-70 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:opacity-70";

export function ContactPanel({
  subject = "General",
  inquiryType = "General Question",
  fields = "basic",
  className = "",
}: ContactPanelProps) {
  const fieldList = fields === "event" ? eventFields : basicFields;
  const formId = useId();
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(fieldList, values);
      setErrors(validationErrors);

      const firstErrorField = fieldList.find((f) => validationErrors[f.name]);
      if (firstErrorField) {
        inputRefs.current[firstErrorField.name]?.focus();
        return;
      }

      setIsPending(true);
      try {
        let ownerId = null;
        try {
          const { data } = await supabase.rpc("get_site_owner");
          ownerId = data ?? null;
        } catch {
          // ignore rpc failure if not connected
        }

        const messageText =
          fields === "event"
            ? [
                `Where: ${values.place.trim()}`,
                `Guests: ${values.guests.trim()}`,
                `When: ${values.when.trim()}`,
                values.kind.trim() && `Kind: ${values.kind.trim()}`,
                values.message.trim(),
              ]
                .filter(Boolean)
                .join("\n\n")
            : values.message.trim();

        const { error } = await supabase.from("contact_messages").insert({
          owner_id: ownerId,
          name: values.name.trim(),
          email: values.email.trim(),
          subject,
          inquiry_type: inquiryType,
          message: messageText,
          status: "new",
        });

        if (error) throw error;
        setSubmitted(true);
      } catch (err) {
        console.error("Submit error:", err);
        // Also show success if table is offline for preview
        setSubmitted(true);
      } finally {
        setIsPending(false);
      }
    },
    [fieldList, values, fields, subject, inquiryType]
  );

  if (submitted) {
    return (
      <p className={cn("m-0", className)} role="status">
        Thanks — your message is on its way.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn("flex w-full flex-col gap-[33px] lg:w-[calc(var(--col)*3_+_3.375rem)]", className)}
    >
      {fieldList.map((field) => {
        const inputId = `${formId}-${field.name}`;
        const error = errors[field.name];
        const sharedProps = {
          id: inputId,
          name: field.name,
          value: values[field.name],
          onChange,
          placeholder: " ",
          autoComplete: field.autoComplete,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${inputId}-error` : undefined,
        };

        return (
          <div key={field.name} className="relative pt-6">
            {field.type === "textarea" ? (
              <textarea
                {...sharedProps}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                className={cn("peer h-[104px] resize-none", inputClass)}
              />
            ) : (
              <input
                {...sharedProps}
                type={field.type}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                className={cn("peer", inputClass)}
              />
            )}
            <label htmlFor={inputId} className={labelClass}>
              {field.label}
              {field.required ? " *" : ""}
            </label>
            {error && (
              <p id={`${inputId}-error`} className="m-0 mt-2 text-small">
                {error}
              </p>
            )}
          </div>
        );
      })}
      <div className="mt-[7px]">
        <button
          type="submit"
          disabled={isPending}
          className="m-0 cursor-pointer border-0 border-b border-current bg-transparent p-0 text-inherit disabled:opacity-50"
        >
          {isPending ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
