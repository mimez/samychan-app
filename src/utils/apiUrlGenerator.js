var baseUrl = process.env.REACT_APP_API_URL
const ApiUrlGenerator = {
    buildFileUrl: function(scmPackageHash, scmFileId) {
        return baseUrl + scmPackageHash + "/file/" + scmFileId + "/json/"
    },

    buildFileExportUrl: function(scmPackageHash, scmFileId) {
        return baseUrl + scmPackageHash + "/file/" + scmFileId + "/csv/"
    },

    buildPackageUrl: function(scmPackageHash) {
        return baseUrl + scmPackageHash + ".json"
    },

    buildReorderUrl: function(scmPackageHash, scmFileId) {
        return baseUrl + scmPackageHash + "/file/" + scmFileId + "/reorder/"
    },

    buildFavoriteUrl: function(scmPackageHash, favNo) {
        return baseUrl + scmPackageHash + "/favorites/" + favNo + ".json"
    },

    buildChannelsUrl: function(scmPackageHash) {
        return baseUrl + scmPackageHash + "/channels.json"
    },

    buildDownloadUrl: function(scmPackageHash) {
        return baseUrl + scmPackageHash + "/download/"
    },

    buildUploadUrl: function() {
        return baseUrl + "upload/"
    },

    buildUploadJsonUrl: function() {
        return baseUrl + "upload.json"
    },

    buildImportSettingsUrl: function(scmPackageHash) {
        return baseUrl + scmPackageHash + "/import-settings.json"
    },

    buildStatsUrl: function() {
        return baseUrl + "stats.json"
    }
}

export default ApiUrlGenerator
