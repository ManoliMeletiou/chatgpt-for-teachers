import { createFileRoute, notFound } from "@tanstack/react-router";
import { WorkshopStage } from "@/components/stage/workshop-stage";
import { getModule } from "@/lib/content/modules";

export const Route = createFileRoute("/_shell/modules/$moduleId")({
  component: ModulePlayer,
});

function ModulePlayer() {
  const { moduleId } = Route.useParams();
  const mod = getModule(moduleId);
  if (!mod) throw notFound();
  return <WorkshopStage mod={mod} />;
}
