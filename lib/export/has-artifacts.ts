import type { WorkflowArtifacts } from "@/lib/types";

export function hasExportableArtifacts(artifacts: WorkflowArtifacts): boolean {
  return (
    artifacts.paperCards.length > 0 ||
    artifacts.researchMap !== null ||
    artifacts.fitAnalysis !== null ||
    artifacts.outreachEmail !== null
  );
}
