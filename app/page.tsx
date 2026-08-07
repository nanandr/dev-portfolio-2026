import { getPortfolio } from "@/lib/portfolio";
import Home from "./home";

export default async function Page() {
  const data = await getPortfolio();
  return (
    <Home data={data}/>
  );
}