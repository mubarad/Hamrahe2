import { RouteObject } from "react-router";
import { AdminRoot } from "./AdminRoot";
import { AdminLayout } from "./AdminLayout";
import { CommandCenter } from "./modules/command/CommandCenter";
import { WorkQueuesView } from "./modules/work/WorkQueuesView";
import { CasesView } from "./modules/cases/CasesView";
import { EntitiesView } from "./modules/entities/EntitiesView";
import { VerificationView } from "./modules/verification/VerificationView";
import { TrustRiskView } from "./modules/trust/TrustRiskView";
import { ModerationView } from "./modules/moderation/ModerationView";
import { SupportOpsView } from "./modules/support/SupportOpsView";
import { AIGovernanceView } from "./modules/ai/AIGovernanceView";
import { RevenueView } from "./modules/revenue/RevenueView";
import { GovernanceView } from "./modules/governance/GovernanceView";
import { ConfigurationView } from "./modules/configuration/ConfigurationView";
import { SystemHealthView } from "./modules/system/SystemHealthView";

export const commandRoutes: RouteObject = {
  path: "command",
  Component: AdminRoot,
  children: [
    {
      Component: AdminLayout,
      children: [
        { index: true, Component: CommandCenter },
        { path: "my-work", Component: WorkQueuesView },
        { path: "alerts", Component: CommandCenter },
        { path: "decisions", Component: CommandCenter },
        { path: "work", Component: WorkQueuesView },
        { path: "cases", Component: CasesView },
        { path: "cases/:caseId", Component: CasesView },
        { path: "entities/users", Component: EntitiesView },
        { path: "entities/users/:userId", Component: EntitiesView },
        { path: "entities/organizations", Component: EntitiesView },
        { path: "entities/organizations/:organizationId", Component: EntitiesView },
        { path: "entities/jobs", Component: EntitiesView },
        { path: "entities/jobs/:jobId", Component: EntitiesView },
        { path: "verification", Component: VerificationView },
        { path: "trust", Component: TrustRiskView },
        { path: "risk", Component: TrustRiskView },
        { path: "abuse-graph", Component: TrustRiskView },
        { path: "moderation/content", Component: ModerationView },
        { path: "moderation/chat", Component: ModerationView },
        { path: "appeals", Component: ModerationView },
        { path: "support", Component: SupportOpsView },
        { path: "growth", Component: AIGovernanceView },
        { path: "learning", Component: AIGovernanceView },
        { path: "ai", Component: AIGovernanceView },
        { path: "revenue", Component: RevenueView },
        { path: "revenue/subscriptions", Component: RevenueView },
        { path: "governance", Component: GovernanceView },
        { path: "configuration", Component: ConfigurationView },
        { path: "system", Component: SystemHealthView },
      ],
    },
  ],
};
