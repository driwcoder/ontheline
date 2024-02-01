import NavBar from "./_components/NavBar";
import SideBar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="md:pl-60 pt-[80px] pb-[16px] md:pr-4 h-full flex flex-col justify-between ">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
