import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import xformArrayToConnection from "@reactioncommerce/api-utils/graphql/xformArrayToConnection.js";

/**
 * @name Unit/tags
 * @method
 * @memberof Unit/GraphQL
 * @summary Returns the tags for a unit
 * @param {Object} unit - Unit response from parent resolver
 * @param {TagConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Tag objects
 */
export default async function tags(unit, connectionArgs, context, info) {
  const { hashtags } = unit;
  if (!hashtags || hashtags.length === 0)
    return xformArrayToConnection(connectionArgs, []);

  const query = await context.queries.tagsByIds(
    context,
    hashtags,
    connectionArgs
  );

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info),
  });
}
