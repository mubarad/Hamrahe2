import { PostAnalyticsData } from "../types/post-types";

export function generateMockPostAnalytics(postId: string, postType?: string): PostAnalyticsData {
  const seed = postId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const factor = (seed % 10) + 1;

  const base: PostAnalyticsData = {
    impressions: 1240 * factor,
    reach: 890 * factor,
    reactions: 142 * factor,
    reactionBreakdown: {
      heart: Math.floor(60 * factor),
      fire: Math.floor(30 * factor),
      thumbsup: Math.floor(25 * factor),
      lightbulb: Math.floor(15 * factor),
      rocket: Math.floor(12 * factor),
    },
    comments: 24 * factor,
    reposts: 18 * factor,
    quotePosts: 7 * factor,
    saves: 35 * factor,
    sends: 19 * factor,
    linkClicks: 88 * factor,
    profileViews: 145 * factor,
    newFollowers: 12 * factor,
    connectionRequests: 8 * factor,
    ctaClicks: 42 * factor,
  };

  if (postType === "video") {
    base.videoStarts = 980 * factor;
    base.avgWatchTime = "0:42";
    base.completionRate = "68%";
  }

  if (postType === "document") {
    base.documentOpens = 620 * factor;
    base.pagesViewed = 4.2;
    base.downloads = 74 * factor;
  }

  if (postType === "job" || postType === "hiring") {
    base.applicants = 29 * factor;
    base.recruiterViews = 54 * factor;
  }

  if (postType === "service" || postType === "project") {
    base.inquiries = 16 * factor;
    base.portfolioViews = 89 * factor;
  }

  return base;
}
