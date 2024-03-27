import { SubHeader } from "..";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex-col relative flex w-full items-center">
      <SubHeader />

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
