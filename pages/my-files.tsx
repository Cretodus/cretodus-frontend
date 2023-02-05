import Layout from "@/components/Layout/Layout";
import MyFilesView from "@/components/View/MyFilesView";

export default function MyFiles() {
  return (
    <Layout>
      <div className="pt-5">
        <MyFilesView />
      </div>
    </Layout>
  );
}
