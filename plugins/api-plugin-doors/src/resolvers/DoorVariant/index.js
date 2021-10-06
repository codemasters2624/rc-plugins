import resolveShopFromShopId from "@reactioncommerce/api-utils/graphql/resolveShopFromShopId.js";
import { encodeDoorOpaqueId } from "../../xforms/id.js";
import getVariants from "../../utils/getVariants.js";
import getVariantMedia from "../../utils/getVariantMedia.js";

export default {
  _id: (node) => encodeDoorOpaqueId(node._id),
  media: (node, args, context) => getVariantMedia(node, context),
  metafields: (node) => node.metafields || [],
  options: (node, args, context) =>
    getVariants(context, node._id, undefined, args),
  shop: resolveShopFromShopId,
};
