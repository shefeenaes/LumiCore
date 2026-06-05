import Image from "next/image";
import type { Testimonial } from "@/types";
import QuoteIcon from "@/components/ui/icons/QuoteIcon";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="shrink-0 basis-full px-2 font-inter sm:basis-1/2">
      <article className="relative mx-auto flex h-[371px] w-full max-w-[355px] flex-col rounded-2xl p-7 shadow-[0px_0px_12px_rgba(0,0,0,0.1)] shadow-white/20">
        {/* Quote mark */}
        <QuoteIcon />

        {/* Quote */}
        <p className="mt-6 flex-1 text-base leading-relaxed text-[#797777]">{testimonial.quote}</p>

        {/* Author */}
        <div className="mt-6 flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={44}
            height={44}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="text-lg text-primary">{testimonial.name}</p>
            <p className="text-sm text-white">{testimonial.role}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
