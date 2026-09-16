

import type { Metadata } from "next";
import Project from '../../../components/project'


export const metadata: Metadata = {
  title: "过往工作参考项目",
  description:
    "查看德昌五金过往的家居裝修、門閘安裝、牆身磚維修等工程案例，了解我们的施工水平与口碑。",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {

  return (
    <>
     <Project/>
    </>
  );
}
