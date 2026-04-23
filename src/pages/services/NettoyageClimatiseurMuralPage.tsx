import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { SERVICE_LANDING_BY_ID } from "@/consts/serviceLandingPages";

const NettoyageClimatiseurMuralPage = () => (
  <ServiceLandingPage config={SERVICE_LANDING_BY_ID.climatiseur} />
);

export default NettoyageClimatiseurMuralPage;
