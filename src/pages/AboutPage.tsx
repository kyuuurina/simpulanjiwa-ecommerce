import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="relative py-24 bg-[hsl(var(--blush))] overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-primary text-xs tracking-widest uppercase font-sans mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3 max-w-2xl mx-auto leading-tight">
            Flowers That Tie Hearts Closer
          </h1>
          <p className="font-display text-lg text-primary italic">
            Simpulan Jiwa — A Binding of Souls
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>
            Simpulan Jiwa is a floral experience brand rooted in the belief that flowers do more
            than mark an occasion — they bring people closer together.
          </p>
          <p>
            The name <em className="text-foreground font-medium">Simpulan Jiwa</em> means{" "}
            <em>a binding of souls</em>. Just as individual blooms are carefully gathered into a
            bouquet, meaningful moments bring hearts together. A bouquet is more than a gift; it is
            a gesture of love, gratitude, celebration, and remembrance.
          </p>
          <p>
            Whether it is a birthday, wedding, appreciation, farewell, or simply a thoughtful
            surprise, we believe flowers have a way of saying what words cannot.
          </p>
          <p>
            Every bouquet tells a story. Every arrangement carries meaning. From the choice of
            blooms to the final ribbon, each detail is thoughtfully crafted to honour the moment
            it represents.
          </p>
          <p className="text-foreground font-medium">
            At Simpulan Jiwa, we are here for life's meaningful moments — helping people express
            what matters most, one bloom at a time.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="container mx-auto px-4 pb-16">
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

      {/* Get in Touch */}
      <section className="bg-[hsl(var(--cream))] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <h2 className="section-heading mb-4">Get in Touch</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Have a custom order request, a question about delivery, or just want to say hello?
              We'd love to hear from you.
            </p>
            <ul className="space-y-5 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Casa Wood Cybersouth, Jln CW 1, 43800 Dengkil, Selangor</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://api.whatsapp.com/send/?phone=601159546069"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +60 11-5954 6069
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:simpulanjiwa@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  simpulanjiwa@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
