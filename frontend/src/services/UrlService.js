export default {
  getFile(url) {
    return fetch(url)
      .then((resp) => resp.text());
  },
  getBase64(url, fileName) {
    return this.getFile(url)
      .then((data) => `data:model/obj;base64,${btoa(data)}`);
  },
};
