import { motion } from "framer-motion";
import {
  CONTACT_ADDRESS_CITY_REGION,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_URL,
  SERVICE_AREAS_MAP_EMBED_URL,
} from "@/consts/contact";

export function ContactBottomDetails() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-4 pt-10 border-t border-border/60"
    >
      <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
        <a href={CONTACT_PHONE_URL} className="hover:text-foreground transition-colors">
          {CONTACT_PHONE_DISPLAY}
        </a>
        <a href={CONTACT_EMAIL_URL} className="hover:text-foreground transition-colors">
          {CONTACT_EMAIL}
        </a>
        <span>{CONTACT_ADDRESS_CITY_REGION}</span>
      </div>
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-border bg-muted/20 aspect-[16/11] sm:aspect-[16/9] lg:aspect-[16/7]">
        <iframe
          src={SERVICE_AREAS_MAP_EMBED_URL}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte des zones desservies par VentiPure"
          className="block h-full w-full"
        />
      </div>
    </motion.div>
  );
}
