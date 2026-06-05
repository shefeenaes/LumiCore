"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import DecorativeIcon from "@/components/ui/icons/DecorativeIcon";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldError = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(to_right,#231F20,#000000)] px-4 py-20 sm:px-6 lg:px-8"
      id="contact"
      aria-label="Contact us"
    >
      {/* Corner decorations — decorativeIcon tucked into opposite corners */}
      <DecorativeIcon
        className="pointer-events-none absolute right-0 top-0 rotate-180 opacity-60"
        aria-hidden="true"
      />
      <DecorativeIcon
        className="pointer-events-none absolute bottom-0 left-0 opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <Button type="submit" className="w-fit py-1 font-inter text-lg">
              Get in touch
            </Button>

            <h2 className="pt-6 font-inter text-3xl text-white sm:text-[32px]">
              Let&apos;s discuss your project!
            </h2>
            <p className="mt-4 font-inter text-lg leading-relaxed text-white">
              Contact us today and learn more about how our interior fit out &amp; custom
              manufacturing services can bring your ideas to life.
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-brand-teal/30 bg-brand-teal/10 p-10 text-center">
                <div className="text-5xl" aria-hidden="true">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Thank you!</h3>
                <p className="text-gray-300">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <div>
                <h2 className="mb-6 font-inter text-2xl text-white sm:text-[32px]">
                  We Love to Hear From You
                </h2>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Your Name"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <Field
                      label="Your Email"
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>
                  <Field
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn(
                        "w-full resize-none rounded-lg bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-teal",
                        errors.message ? "ring-2 ring-red-500" : ""
                      )}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="px-14 py-2 text-base">
                    Submit
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
};

function Field({ label, id, name, type = "text", value, onChange, error, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-md bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-teal",
          error && "ring-2 ring-red-500"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
