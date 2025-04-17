import { SWRConfig } from "swr";
import { FacultyProvider } from "../context/FacultyContext";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        keepPreviousData: true,
        refreshInterval: 1000 * 60 * 5,
        dedupingInterval: 1000 * 60 * 5,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <FacultyProvider>
        <div className="d-flex flex-column vh-100">
          <Header />
          <div className="d-flex flex-grow-1">
            <Sidebar />
            <main className="flex-grow-1 p-4 bg-light overflow-auto">
              {children}
            </main>
            
          </div>
        </div>
      </FacultyProvider>
    </SWRConfig>
  );
};

export default Layout;


