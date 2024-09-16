import { CloudSnow, CloudRain, Cloudy, Sun } from "lucide-react";

export const ICONS: Record<string, JSX.Element> = {
  Rain: <CloudRain size={70} className="text-white" />,
  Snow: <CloudSnow size={70} className="text-white" />,
  Clouds: <Cloudy size={70} className="text-white" />,
  Clear: <Sun size={70} className="text-yellow-400" />,
};
