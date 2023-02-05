import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import FileView from "../../components/View/FileView";

export default function File() {
  const router = useRouter();
  const { oid } = router.query;

  return (
    <Layout>
      <div className="pt-10">
        <FileView oid={oid as string} />
      </div>
    </Layout>
  );
}
