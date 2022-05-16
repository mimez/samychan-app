import apiUrlGenerator from './apiUrlGenerator';
// @todo: error-handling implementieren, z.B. ob der result auch json ist usw....
const Api = {
  getPackage(scmPackageId, cbSuccess, cbError) {
    fetch(apiUrlGenerator.buildPackageUrl(scmPackageId))
      .then((results) => results.json())
      .then((data) => {
        cbSuccess(data);
      }).catch((error) => {
        cbError(error);
      });
  },

  getFavorites(scmPackageId, favNo, callback) {
    fetch(apiUrlGenerator.buildFavoriteUrl(scmPackageId, favNo))
      .then((results) => results.json())
      .then((data) => {
        callback(data);
      });
  },

  getFile(scmPackageHash, scmFileId, callback) {
    fetch(apiUrlGenerator.buildFileUrl(scmPackageHash, scmFileId))
      .then((results) => {
        if (!results.ok) {
          throw Error(results.statusText);
        }
        return results;
      })
      .then((results) => results.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        /* eslint-disable */
        console.log(error);
        /* eslint-enable */
      });
  },

  saveFile(scmPackageHash, scmFileId, channels, callback) {
    fetch(apiUrlGenerator.buildFileUrl(scmPackageHash, scmFileId), {
      method: 'POST',
      body: JSON.stringify(channels),
    })
      .then((response) => response.json())
      .then(() => { callback(); });
  },

  saveFavorites(scmPackageHash, favNo, channels, callback) {
    fetch(apiUrlGenerator.buildFavoriteUrl(scmPackageHash, favNo), {
      method: 'POST',
      body: JSON.stringify(channels),
    })
      .then((response) => response.json())
      .then(() => { callback(); });
  },

  addChannelsToFav(scmPackageHash, favNo, channelIds, callback) {
    const channelData = {};
    channelIds.forEach((channel) => {
      channelData[channel] = {
        channelId: channel,
        action: 'add',
      };
    });
    fetch(apiUrlGenerator.buildFavoriteUrl(scmPackageHash, favNo), {
      method: 'POST',
      body: JSON.stringify(channelData),
    })
      .then((response) => response.json())
      .then(() => { callback(); });
  },

  removeChannelsFromFav(scmPackageHash, favNo, channelIds, callback) {
    const channelData = {};
    channelIds.forEach((channel) => {
      channelData[channel] = {
        channelId: channel,
        action: 'remove',
      };
    });
    fetch(apiUrlGenerator.buildFavoriteUrl(scmPackageHash, favNo), {
      method: 'POST',
      body: JSON.stringify(channelData),
    })
      .then((response) => response.json())
      .then(() => { callback(); });
  },

  getStats(callback) {
    fetch(apiUrlGenerator.buildStatsUrl(), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => { callback(data); });
  },
};

export default Api;
