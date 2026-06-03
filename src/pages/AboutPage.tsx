import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="animate-fade-in">

      {/* Hero — full bleed image with text overlay */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src="/images/landing.JPG"
          alt="Simpulan Jiwa"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 pb-12">
          <p className="text-brand-secondary text-xs tracking-widest uppercase font-sans mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight mb-2">
            Flowers That Tie Hearts Closer
          </h1>
          <p className="font-display text-lg text-brand-secondary italic">
            Simpulan Jiwa — A Binding of Souls
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {["1", "2", "3", "4"].map((n) => (
          <div key={n} className="aspect-square overflow-hidden">
            <img
              src={`/images/${n}.jpeg`}
              alt={`Simpulan Jiwa ${n}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </section>

      {/* Brand story */}
      <section className="container mx-auto px-6 py-16 max-w-2xl text-center">
        <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>
            Simpulan Jiwa is a floral experience brand rooted in the belief that flowers do more
            than mark an occasion — they bring people closer together.
          </p>
          <p>
            The name <strong className="text-foreground">Simpulan Jiwa</strong> means{" "}
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
          <p className="text-foreground font-medium pt-2">
            At Simpulan Jiwa, we are here for life's meaningful moments — helping people express
            what matters most, one bloom at a time.
          </p>
        </div>
      </section>

      {/* Get in Touch — light */}
      <section className="bg-brand-secondary/20 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Get in Touch</h2>
            <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
              Have a custom order request, a question about delivery, or just want to say hello?
              We'd love to hear from you.
            </p>
            <ul className="space-y-4 text-sm text-muted-foreground inline-flex flex-col items-start text-left">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                <span>Casa Wood Cybersouth, Jln CW 1, 43800 Dengkil, Selangor</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <a
                  href="https://api.whatsapp.com/send/?phone=601159546069"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-primary transition-colors"
                >
                  +60 11-5954 6069
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a
                  href="mailto:simpulanjiwa@gmail.com"
                  className="hover:text-brand-primary transition-colors"
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
