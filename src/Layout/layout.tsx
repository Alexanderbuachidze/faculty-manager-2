import { SWRConfig } from "swr";
import { FacultyProvider } from "../context/FacultyContext";


const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SWRConfig
      value={{
        keepPreviousData: true,
        refreshInterval: 1000 * 60 * 5,
        dedupingInterval: 1000 * 60 * 5,
      }}
    >
      <FacultyProvider>
        {children}
      </FacultyProvider>
    </SWRConfig>
  );
};

export default Layout;
