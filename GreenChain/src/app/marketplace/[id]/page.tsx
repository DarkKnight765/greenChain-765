import dynamic from "next/dynamic";

const ProjectDetailClient = dynamic(() => import("./ProjectDetailClient"), {
  ssr: false,
});

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ProjectDetailClient id={params.id} />;
}
