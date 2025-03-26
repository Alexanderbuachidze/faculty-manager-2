import Layout from "./Layout/layout";
import FacultyList from "./components/FacultyList";

const App = () => {
  return (
    <Layout>
      <div className="container">
        <h1>University Faculty Manager</h1>
        <FacultyList />
      </div>
    </Layout>
  );
};

export default App;
