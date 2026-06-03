import Image from "next/image";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-brand-dark-card p-6">
      {/* Quote mark */}
      <div aria-hidden="true" className="mb-4 text-5xl font-bold leading-none text-brand-teal">
        &#10077;&#10077;
      </div>

      {/* Quote */}
      <p className="flex-1 text-sm leading-relaxed text-gray-300">{testimonial.quote}</p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-brand-teal">{testimonial.name}</p>
          <p className="text-xs text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}
