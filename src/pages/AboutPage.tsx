import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const milestones = [
  { year: "2018", event: "Founded in a small apartment in Petaling Jaya, KL." },
  { year: "2019", event: "First pop-up at a local farmers market. Sold out in 3 hours." },
  { year: "2021", event: "Launched online delivery and served our 1,000th customer." },
  { year: "2023", event: "Opened our first studio-boutique in Bangsar." },
  { year: "2025", event: "Expanded to same-day delivery across the whole Klang Valley." },
];

export default function AboutPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Simulate async
    setTimeout(() => {
      console.log("Contact form submission:", form);
      toast.success("Message sent!", {
        description: "Thank you for reaching out. We'll reply within 1–2 business days.",
      });
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 800);
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative py-24 bg-[hsl(var(--blush))] overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-primary text-xs tracking-widest uppercase font-sans mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-5 max-w-xl mx-auto leading-tight">
            Born from Blooms, Built on Feeling
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Simpulan Jiwa began with one florist, a bucket of peonies, and a belief that flowers
            could bridge the gap between feelings and words.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="https://picsum.photos/seed/about-florist/600/800"
              alt="Our founder"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="section-heading mb-4">From a Petal to a Purpose</h2>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Our founder, Aisyah, grew up watching her grandmother arrange bunga raya and
                jasmine from their garden every Sunday morning. That ritual — of choosing each
                stem thoughtfully, of gifting beauty without occasion — became the foundation of
                Simpulan Jiwa.
              </p>
              <p>
                "Simpulan Jiwa" literally means "ties of the soul." We believe that a well-crafted
                bouquet does more than decorate a room. It says <em>I was thinking of you</em>. It
                marks a moment. It lingers in memory long after the petals fall.
              </p>
              <p>
                Today, our team of six passionate florists create over 200 arrangements every week,
                sourcing fresh blooms from local farms and international growers who share our
                commitment to quality and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">Our Journey</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {milestones.map(({ year, event }) => (
              <div key={year} className="flex gap-5 items-start">
                <div className="shrink-0 w-16 text-right">
                  <span className="font-display text-primary font-semibold text-lg">{year}</span>
                </div>
                <div className="w-px bg-border self-stretch relative">
                  <div className="absolute top-1 -left-1.5 w-3 h-3 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5 flex-1">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-heading text-center mb-10">Behind the Studio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[11, 22, 33, 44].map((seed) => (
            <div key={seed} className="rounded-xl overflow-hidden aspect-square">
              <img
                src={`https://picsum.photos/seed/studio${seed}/400/400`}
                alt="Studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[hsl(var(--cream))] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="section-heading mb-4">Get in Touch</h2>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                Whether you have a custom order request, a question about delivery, or just want to
                say hello — we'd love to hear from you.
              </p>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>23, Jalan Telawi 3, Bangsar, 59100 Kuala Lumpur</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+60123456789" className="hover:text-primary transition-colors">
                    +60 12-345 6789
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:hello@simpulanjiwa.my" className="hover:text-primary transition-colors">
                    hello@simpulanjiwa.my
                  </a>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-xl mb-5">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nurul Aisyah"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-foreground mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="I'd love to order a custom wedding bouquet…"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={sending}>
                  <Send className="w-4 h-4" />
                  {sending ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
