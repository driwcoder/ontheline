import NavBar from "./_components/NavBar";
import SideBar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="p-4 md:pl-60 md:pr-4 pt-[96px] h-full flex flex-col justify-between ">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
