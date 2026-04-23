import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { SERVICE_LANDING_BY_ID } from "@/consts/serviceLandingPages";

const NettoyageConduitsCommerciauxPage = () => (
  <ServiceLandingPage config={SERVICE_LANDING_BY_ID.commercial} />
);

export default NettoyageConduitsCommerciauxPage;
