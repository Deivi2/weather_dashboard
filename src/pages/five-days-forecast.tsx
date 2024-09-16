import Forecast from "@/components/Forecast/Forecast";
import { useParams } from "react-router-dom";

const Page = () => {
  const { slug } = useParams();

  return <Forecast slug={slug} />;
};

export default Page;
