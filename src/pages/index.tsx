import { Link } from "react-router-dom";

import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <Layout>
      <div className="flex h-full items-center justify-center">
        <Link to="/stay/9001948244">
          <Button>Results</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
