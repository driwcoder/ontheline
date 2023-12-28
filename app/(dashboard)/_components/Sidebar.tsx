import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex items-center flex-col w--full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
