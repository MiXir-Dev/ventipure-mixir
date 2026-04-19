import { motion } from "framer-motion";
import equipNexair from "@/assets/equip-nexair.jpg";
import equipOmega from "@/assets/equip-omega.jpg";

const items = [
  {
    tag: "Aspiration",
    title: "Capteur de poussière pulsé",
    sub: "NexAir / LTE Canada",
    text: "Un collecteur de poussière québécois haute performance qui crée une pression négative puissante pour aspirer toutes les particules à travers une filtration HEPA.",
    image: equipNexair,
    alt: "Capteur de poussière pulsé NexAir avec filtration HEPA",
  },
  {
    tag: "Soufflage",
    title: "Compresseur d'air à essence",
    sub: "Omega Gustmaster, motorisé Honda",
    text: "Motorisé par Honda, ce compresseur alimente nos buses de soufflage et nos furets pneumatiques pour déloger la saleté la plus incrustée dans le réseau.",
    image: equipOmega,
    alt: "Compresseur d'air à essence Omega Gustmaster motorisé Honda",
  },
];

export function EquipmentShowcase() {
  return (
    <section className="vp-section-padding bg-muted/20">
      <div className="vp-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            Équipement de pointe
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-5">
            Du matériel professionnel,<br />pour un travail rigoureux
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Chaque intervention résidentielle et commerciale est réalisée avec un équipement
            spécialisé, choisi pour sa puissance, sa propreté et sa fiabilité sur le terrain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--vp-shadow-card)] transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={it.image}
                  alt={it.alt}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-7 md:p-9">
                <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.18em] mb-3">
                  {it.tag}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-1.5">
                  {it.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider mb-4">
                  {it.sub}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {it.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
