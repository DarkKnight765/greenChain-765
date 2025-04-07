import ProjectDetailClient from "./ProjectDetailClient"

interface Props {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return <ProjectDetailClient id={params.id} />
}
