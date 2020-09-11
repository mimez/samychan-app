import apiUrlGenerator from "./apiUrlGenerator";
/*@todo: error-handling implementieren, z.B. ob der result auch json ist usw....*/
var Api = {
  getPackage(scmPackageId, callback) {
    fetch(apiUrlGenerator.buildPackageUrl(scmPackageId))
      .then(results => {
        return results.json()
      })
      .then(data => {
        callback(data)
      })
  },

  getFavorites(scmPackageId, favNo, callback) {
    fetch(apiUrlGenerator.buildFavoriteUrl(scmPackageId, favNo))
      .then(results => {
        return results.json()
      })
      .then(data => {
        callback(data)
      })
  },

  getFile(scmPackageHash, scmFileId, callback) {
    fetch(apiUrlGenerator.buildFileUrl(scmPackageHash, scmFileId))
      .then(results => {
        if (!results.ok) {
          throw Error(results.statusText);
        }
        return results;
      })
      .then(results => {
        return results.json()
      })
      .then(data => {
        callback(data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  saveFile(scmPackageHash, scmFileId, channels, callback) {

    fetch(apiUrlGenerator.buildFileUrl(scmPackageHash, scmFileId), {
      method: "POST",
      body: JSON.stringify(channels)
    })
      .then(response => response.json())
      .then(() => {callback()});

    console.log(channels)
  },

  addChannelsToFav(scmPackageHash, favNo, channels, callback) {
    fetch(apiUrlGenerator.buildFavoriteUrl(scmPackageHash, favNo), {
      method: "POST",
      body: JSON.stringify(channels)
    })
      .then(response => response.json())
      .then(() => {callback()})
  }
}

export default Api