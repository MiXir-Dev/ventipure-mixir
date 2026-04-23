import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { SERVICE_LANDING_BY_ID } from "@/consts/serviceLandingPages";

const NettoyageEchangeurAirPage = () => (
  <ServiceLandingPage config={SERVICE_LANDING_BY_ID.echangeur} />
);

export default NettoyageEchangeurAirPage;
