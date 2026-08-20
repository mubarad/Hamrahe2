// Post Distribution and Ranking Prototype
// Local scoring model with positive and negative weights

export const SCORING_WEIGHTS = {
  qualifiedView: 0.1,
  meaningfulDwell: 0.5,
  reaction: 1.0,
  expandSeeMore: 1.0,
  mediaOrDocumentOpen: 1.5,
  save: 3.0,
  shortComment: 2.0,
  meaningfulComment: 5.0,
  authorReply: 2.0,
  sendInMessage: 5.0,
  directRepost: 6.0,
  meaningfulQuotePost: 8.0,
  followAuthorFromPost: 6.0,
  connectionRequestFromPost: 7.0,
  professionalCtaClick: 8.0,
  applyOrCollaborationRequest: 12.0,
  verifiedProfessionalOutcome: 15.0,

  // Negative weights
  immediateSkip: -0.2,
  hidePost: -4.0,
  notInterested: -5.0,
  muteAuthor: -8.0,
  unfollowAfterViewing: -8.0,
  report: -15.0,
  artificialEngagementPenalty: -20.0,
};

export function calculatePostScore(metrics: {
  views?: number;
  reactions?: number;
  comments?: number;
  commentsLengthAvg?: number;
  reposts?: number;
  saves?: number;
  isVerifiedOutcome?: boolean;
  hasCta?: boolean;
  negativeActionsCount?: number;
}): number {
  let score = 0;

  const views = metrics.views || 50;
  score += views * SCORING_WEIGHTS.qualifiedView;

  const reactions = metrics.reactions || 0;
  score += reactions * SCORING_WEIGHTS.reaction;

  const comments = metrics.comments || 0;
  const avgLen = metrics.commentsLengthAvg || 25;
  const isMeaningfulComment = avgLen > 40;
  score += comments * (isMeaningfulComment ? SCORING_WEIGHTS.meaningfulComment : SCORING_WEIGHTS.shortComment);

  const reposts = metrics.reposts || 0;
  score += reposts * SCORING_WEIGHTS.directRepost;

  const saves = metrics.saves || 0;
  score += saves * SCORING_WEIGHTS.save;

  if (metrics.isVerifiedOutcome) {
    score += SCORING_WEIGHTS.verifiedProfessionalOutcome;
  }

  if (metrics.hasCta) {
    score += SCORING_WEIGHTS.professionalCtaClick;
  }

  if (metrics.negativeActionsCount) {
    score += metrics.negativeActionsCount * SCORING_WEIGHTS.notInterested;
  }

  return Math.round(score * 10) / 10;
}

export function heuristicallyClassifyComment(text: string): "short" | "meaningful" {
  if (text.trim().length >= 35) return "meaningful";
  return "short";
}

export function heuristicallyClassifyQuote(text: string): "low_effort" | "meaningful" {
  if (text.trim().length >= 50) return "meaningful";
  return "low_effort";
}
