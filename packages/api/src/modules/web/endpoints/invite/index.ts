import type { EndpointBody, EndpointParams, invite, Pagination, user } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Invite DTOs - derived from endpoint types
// =============================================================================

export type InviteFeedbackParams = EndpointParams<"/api/private/invite/feedback">;
export type InviteFeedbackBody = EndpointBody<"/api/private/invite/feedback">;

/** Input type with boolean accepted (converted to string internally) */
export type InviteFeedbackInput = { accepted: boolean };

export const inviteEndpoint = createSimpleEndpoint<invite>()({
  basePath: "/api/private/invite",
  routes: {
    index: "/api/private/invite/index",
    show: "/api/private/invite/show",
    store: "/api/private/invite/store",
    update: "/api/private/invite/update",
    destroy: "/api/private/invite/destroy",
    many: "/api/private/invite/many",
    trash: "/api/private/invite/trash",
    restore: "/api/private/invite/restore",
  },
});

// Custom endpoints
export const inviteMe = () =>
  typedRequest<Pagination<invite>>()({
    route: "/api/private/invite/me",
  });

export const inviteFeedback = (params: InviteFeedbackParams, body: InviteFeedbackInput) =>
  typedRequest<{ invite: invite; user: user }>()({
    route: "/api/private/invite/feedback",
    params,
    body: { accepted: String(body.accepted) },
  });

export type Invite = invite;

// Direct function exports for backwards compatibility
export const inviteIndex = inviteEndpoint.index;
export const inviteShow = inviteEndpoint.show;
export const inviteStore = inviteEndpoint.store;
export const inviteUpdate = inviteEndpoint.update;
export const inviteDestroy = inviteEndpoint.destroy;
export const inviteMany = inviteEndpoint.many;
export const inviteTrash = inviteEndpoint.trash;
export const inviteRestore = inviteEndpoint.restore;
