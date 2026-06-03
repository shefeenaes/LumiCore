"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
      className="relative overflow-hidden bg-[#0d0d0d] px-4 py-20 sm:px-6 lg:px-8"
      id="contact"
      aria-label="Contact us"
    >
      {/* Geometric lines decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
        <svg className="absolute left-0 top-0 h-full w-64" viewBox="0 0 200 600" fill="none">
          <line x1="20" y1="50" x2="180" y2="300" stroke="white" strokeWidth="0.5" />
          <line x1="20" y1="100" x2="150" y2="400" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="20" x2="200" y2="250" stroke="white" strokeWidth="0.5" />
          <polygon points="60,150 120,80 140,200" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
        <svg className="absolute right-0 top-0 h-full w-64" viewBox="0 0 200 600" fill="none">
          <line x1="180" y1="50" x2="20" y2="300" stroke="white" strokeWidth="0.5" />
          <line x1="180" y1="100" x2="50" y2="400" stroke="white" strokeWidth="0.5" />
          <polygon points="140,150 80,80 60,200" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-5 inline-block rounded-full bg-brand-teal px-5 py-1.5 text-sm font-semibold text-black">
              Get in touch
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Let&apos;s discuss your project!
            </h2>
            <p className="mt-4 leading-relaxed text-gray-400">
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
                <div className="text-5xl" aria-hidden="true">✓</div>
                <h3 className="text-xl font-bold text-white">Thank you!</h3>
                <p className="text-gray-300">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
                  We Love to Hear From You
                </h2>
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-4">
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
                    <label htmlFor="message" className="sr-only">Message</label>
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
                        "w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal",
                        errors.message ? "border-red-500" : "border-white/20 hover:border-white/40"
                      )}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" variant="teal" size="lg" className="w-full justify-center rounded-xl">
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
          "w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal",
          error ? "border-red-500" : "border-white/20 hover:border-white/40"
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
