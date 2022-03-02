import StartupTable from "../components/StartupTable";
import { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="p-4">
      <div className="mb-4 font-gray-700 font-medium text-2xl">Startups</div>
      <StartupTable />
    </div>
  );
};

export default Home;
