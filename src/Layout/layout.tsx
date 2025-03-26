import { SWRConfig } from "swr";
import { FacultyProvider } from "../context/FacultyContext";
import { useEffect, useState } from "react";
import { getFaculties } from "../lib/getFaculties";
import { Faculty } from "../lib/faculty"


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    getFaculties().then(setFaculties);
  }, []);

  return (
    <SWRConfig
      value={{
        keepPreviousData: true,
        revalidateOnMount: false,
        refreshInterval: 1000 * 60 * 5,
        dedupingInterval: 1000 * 60 * 5,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <FacultyProvider initialFaculties={faculties}>
        {children}
      </FacultyProvider>
    </SWRConfig>
  );
};

export default Layout;
