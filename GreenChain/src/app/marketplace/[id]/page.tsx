// src/app/marketplace/[id]/page.tsx
import ProjectDetailClient from "@/components/ProjectDetailClient"

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ProjectDetailClient id={params.id} />;
}
