import Layout from "@/components/Layout/Layout";
import Banner from "../components/Banner";
import MarketView from "../components/View/MarketView";

export default function Home() {
  return (
    <Layout>
      <div className="pt-10">
        <Banner
          title="Cretodus"
          subtitle="Decentralize data marketplace for everyone"
        />
        <MarketView />
      </div>
    </Layout>
  );
}
