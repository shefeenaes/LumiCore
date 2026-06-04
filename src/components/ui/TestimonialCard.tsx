import Image from "next/image";
import type { Testimonial } from "@/types";
import QuoteIcon from "@/components/ui/icons/QuoteIcon";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-brand-dark-card p-6 shadow-[0_0_12px_0_#4D4A4A]">
      {/* Quote mark */}
      <QuoteIcon />

      {/* Quote */}
      <p className="flex-1 text-sm leading-relaxed text-[#797777]">{testimonial.quote}</p>

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
          <p className="text-xs text-white">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}
