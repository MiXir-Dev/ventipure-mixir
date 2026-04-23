import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { SERVICE_LANDING_BY_ID } from "@/consts/serviceLandingPages";

const NettoyageConduitsFournaisePage = () => (
  <ServiceLandingPage config={SERVICE_LANDING_BY_ID.conduits} />
);

export default NettoyageConduitsFournaisePage;
