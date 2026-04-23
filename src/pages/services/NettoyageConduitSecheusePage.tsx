import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { SERVICE_LANDING_BY_ID } from "@/consts/serviceLandingPages";

const NettoyageConduitSecheusePage = () => (
  <ServiceLandingPage config={SERVICE_LANDING_BY_ID.secheuse} />
);

export default NettoyageConduitSecheusePage;
