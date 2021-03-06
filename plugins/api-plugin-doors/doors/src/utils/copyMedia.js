import Logger from "@reactioncommerce/logger";

/**
 * @function copyMedia
 * @private
 * @description copy images links to cloned variant from original
 * @param {Object} context -  an object containing the per-request state
 * @param {String} newId - [cloned|original] door _id
 * @param {String} variantOldId - old variant _id
 * @param {String} variantNewId - - cloned variant _id
 * @returns {undefined}
 */
export default async function copyMedia(
  context,
  newId,
  variantOldId,
  variantNewId
) {
  const { Media } = context.collections;
  if (!Media) return;

  await Media.find({
    "metadata.variantId": variantOldId,
  })
    .then((fileRecords) => {
      // Copy File and insert
      const promises = fileRecords.map((fileRecord) =>
        fileRecord.fullClone({
          doorId: newId,
          variantId: variantNewId,
        })
      );
      return Promise.all(promises);
    })
    .catch((error) => {
      Logger.error(`Error in copyMedia for door ${newId}`, error);
    });
}
