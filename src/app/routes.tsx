import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Layout } from "./components/Layout";
import { HomeFeed } from "./components/home/HomeFeed";
import { ProfilePage } from "./components/profile/ProfilePage";
import { JobsPage } from "./components/jobs/JobsPage";
import { MessagesPage } from "./components/messages/MessagesPage";
import { NetworkPage } from "./components/network/NetworkPage";
import { NotificationsPage } from "./components/notifications/NotificationsPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { PremiumPage } from "./components/premium/PremiumPage";
import { ProjectsPage } from "./components/projects/ProjectsPage";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { AuthPage } from "./components/auth/AuthPage";
import { LearningPage } from "./components/learning/LearningPage";
import { AssessmentPage } from "./components/learning/AssessmentPage";
import { CareerPathsPage } from "./components/learning/CareerPathsPage";
import { CareerPathDetailPage } from "./components/learning/CareerPathDetailPage";
import { UnitPage } from "./components/learning/UnitPage";
import { CritiquePage } from "./components/learning/CritiquePage";
import { CertificatesPage } from "./components/learning/CertificatesPage";
import { WalletPage } from "./components/learning/WalletPage";
import { PartnerPage } from "./components/learning/PartnerPage";
import { CompanyPage } from "./components/company/CompanyPage";
import { StartupPage } from "./components/startup/StartupPage";
import { PostDetailPage } from "./components/posts/PostDetailPage";
import { SearchResultsPage } from "./components/search/SearchResultsPage";
import { AssessmentCenterPage } from "./components/assessment-center/AssessmentCenterPage";
import { AssessmentCenterDetailPage } from "./components/assessment-center/AssessmentCenterDetailPage";

import { AIEnginePage } from "./components/ai-engine/AIEnginePage";
import { ForMeView } from "./components/ai-engine/ForMeView";
import { AssistantView } from "./components/ai-engine/AssistantView";
import { ToolRegistryView } from "./components/ai-engine/ToolRegistryView";
import { GoalsView } from "./components/ai-engine/GoalsView";
import { AnalyticsView } from "./components/ai-engine/AnalyticsView";
import { VerificationView } from "./components/ai-engine/VerificationView";
import { CasesView } from "./components/ai-engine/CasesView";
import { OutputsView } from "./components/ai-engine/OutputsView";
import { MemoryView } from "./components/ai-engine/MemoryView";
import { QuotaView } from "./components/ai-engine/QuotaView";
import { commandRoutes } from "../admin/adminRoutes";

export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      commandRoutes,
      { path: "/auth", Component: AuthPage },
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: HomeFeed },
          {
            path: "ai-engine",
            Component: AIEnginePage,
            children: [
              { index: true, Component: ForMeView },
              { path: "for-me", Component: ForMeView },
              { path: "assistant", Component: AssistantView },
              { path: "tools", Component: ToolRegistryView },
              { path: "goals", Component: GoalsView },
              { path: "analytics", Component: AnalyticsView },
              { path: "verification", Component: VerificationView },
              { path: "cases", Component: CasesView },
              { path: "outputs", Component: OutputsView },
              { path: "memory", Component: MemoryView },
              { path: "quota", Component: QuotaView },
            ],
          },
          { path: "network", Component: NetworkPage },
          { path: "jobs", Component: JobsPage },
          { path: "learning", Component: LearningPage },
          { path: "learning/assessments/:assessmentId", Component: AssessmentPage },
          { path: "learning/paths", Component: CareerPathsPage },
          { path: "learning/paths/:pathId", Component: CareerPathDetailPage },
          { path: "learning/unit/:unitId", Component: UnitPage },
          { path: "learning/critique/:unitId", Component: CritiquePage },
          { path: "learning/certificates", Component: CertificatesPage },
          { path: "learning/wallet", Component: WalletPage },
          { path: "learning/partner", Component: PartnerPage },
          { path: "messages", Component: MessagesPage },
          { path: "notifications", Component: NotificationsPage },
          { path: "profile", Component: ProfilePage },
          { path: "profile/:userId", Component: ProfilePage },
          { path: "company/:companyId", Component: CompanyPage },
          { path: "company/:companyId/admin", Component: CompanyPage },
          { path: "startup/:startupId", Component: StartupPage },
          { path: "startup/:startupId/admin", Component: StartupPage },
          { path: "posts/:postId", Component: PostDetailPage },
          { path: "search", Component: SearchResultsPage },
          { path: "analytics", element: <Navigate to="/ai-engine/analytics" replace /> },
          { path: "assessment-center", Component: AssessmentCenterPage },
          { path: "assessment-center/:assessmentId", Component: AssessmentCenterDetailPage },
          { path: "settings", Component: SettingsPage },
          { path: "premium", Component: PremiumPage },
          { path: "projects", Component: ProjectsPage },
          { path: "*", element: <PlaceholderPage title="Not Found" /> },
        ],
      },
    ],
  },
]);
