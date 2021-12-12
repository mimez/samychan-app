const baseUrl = process.env.REACT_APP_API_URL;
const ApiUrlGenerator = {
  buildFileUrl(scmPackageHash, scmFileId) {
    return `${baseUrl}${scmPackageHash}/file/${scmFileId}/json/`;
  },

  buildFileExportUrl(scmPackageHash, scmFileId) {
    return `${baseUrl}${scmPackageHash}/file/${scmFileId}/csv/`;
  },

  buildPackageUrl(scmPackageHash) {
    return `${baseUrl}${scmPackageHash}.json`;
  },

  buildReorderUrl(scmPackageHash, scmFileId) {
    return `${baseUrl}${scmPackageHash}/file/${scmFileId}/reorder/`;
  },

  buildFavoriteUrl(scmPackageHash, favNo) {
    return `${baseUrl}${scmPackageHash}/favorites/${favNo}.json`;
  },

  buildChannelsUrl(scmPackageHash) {
    return `${baseUrl}${scmPackageHash}/channels.json`;
  },

  buildDownloadUrl(scmPackageHash) {
    return `${baseUrl}${scmPackageHash}/download/`;
  },

  buildUploadUrl() {
    return `${baseUrl}upload/`;
  },

  buildUploadJsonUrl() {
    return `${baseUrl} + 'upload.json`;
  },

  buildImportSettingsUrl(scmPackageHash) {
    return `${baseUrl}${scmPackageHash}/import-settings.json`;
  },

  buildStatsUrl() {
    return `${baseUrl}stats.json`;
  },
};

export default ApiUrlGenerator;
