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

      {/* Intro — split layout */}
      <section className="grid md:grid-cols-2">
        {/* Left: color block with first paragraph */}
        <div className="bg-brand-primary text-white p-10 md:p-16 flex items-center">
          <p className="font-display text-xl md:text-2xl leading-relaxed italic">
            "Flowers do more than mark an occasion — they bring people closer together."
          </p>
        </div>
        {/* Right: image */}
        <div className="aspect-[4/3] md:aspect-auto">
          <img
            src="/images/big-bloom.jpeg"
            alt="Simpulan Jiwa blooms"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Brand story — alternating sections */}
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
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
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-brand-secondary/30 py-14">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="font-display text-2xl md:text-3xl text-brand-primary leading-relaxed">
            Every bouquet tells a story. Every arrangement carries meaning.
          </p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            From the choice of blooms to the final ribbon, each detail is thoughtfully crafted
            to honour the moment it represents.
          </p>
        </div>
      </section>

      {/* Closing statement + image row */}
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-12">
          At Simpulan Jiwa, we are here for life's meaningful moments — helping people express
          what matters most, one bloom at a time.
        </p>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["1", "2", "3", "4"].map((n) => (
            <div key={n} className="rounded-xl overflow-hidden aspect-square">
              <img
                src={`/images/${n}.jpeg`}
                alt={`Simpulan Jiwa ${n}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Get in Touch — dark bg */}
      <section className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Get in Touch</h2>
            <p className="text-white/70 text-sm mb-10 leading-relaxed">
              Have a custom order request, a question about delivery, or just want to say hello?
              We'd love to hear from you.
            </p>
            <ul className="space-y-5 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-secondary mt-0.5 shrink-0" />
                <span>Casa Wood Cybersouth, Jln CW 1, 43800 Dengkil, Selangor</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <a
                  href="https://api.whatsapp.com/send/?phone=601159546069"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +60 11-5954 6069
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                <a
                  href="mailto:simpulanjiwa@gmail.com"
                  className="hover:text-white transition-colors"
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
