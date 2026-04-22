import { motion } from "framer-motion";
import {
  CONTACT_ADDRESS_CITY_REGION,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_URL,
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
    </motion.div>
  );
}
