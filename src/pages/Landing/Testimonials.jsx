import { LuQuote } from "react-icons/lu";
import { BlurFade } from "./BlurFade";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content:
      "Bravt Cloud has transformed our development workflow. The performance is unmatched, and the pricing is transparent.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer at DevScale",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content:
      "The instant deployment and flexible resource scaling have made our operations significantly more efficient.",
  },
  {
    name: "Emily Watson",
    role: "Founder at DataStack",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content:
      "We've cut our infrastructure costs by 40% while improving performance. Bravt Cloud is a game-changer.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="container relative mx-auto mt-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-300 rounded-full blur-3xl animate-pulse opacity-30" />
      </div>

      <div className="mb-16 text-center">
        <BlurFade
          delay={0.25}
          className="text-3xl font-bold text-zinc-900 sm:text-4xl"
        >
          Trusted by Developers
        </BlurFade>
        <BlurFade delay={0.5} className="mt-4 text-xl text-zinc-600">
          See what our customers have to say about Bravt Cloud
        </BlurFade>
      </div>

      <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <BlurFade
            key={`testimonial-${index}`}
            delay={(index + 1) * 0.25}
            className="relative p-8 transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 w-24 h-24 -mt-4 -mr-4 bg-blue-100 rounded-full blur-xl" />
            <LuQuote className="w-10 h-10 mb-4 text-blue-200" />
            <p className="mb-6 text-zinc-600">{testimonial.content}</p>
            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-zinc-900">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-zinc-500">{testimonial.role}</p>
              </div>
            </div>
            <div className="absolute bottom-0 w-12 h-1 -ml-6 rounded-full left-1/2 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
