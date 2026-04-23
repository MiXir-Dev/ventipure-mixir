import { LocationLandingPage } from "@/components/locations/LocationLandingPage";
import { LOCATION_LANDING_BY_PATH } from "@/consts/locationLandingPages";
import { ROUTE_PATHS } from "@/consts/navigation";

const LavalPage = () => <LocationLandingPage config={LOCATION_LANDING_BY_PATH[ROUTE_PATHS.LAVAL]} />;

export default LavalPage;
