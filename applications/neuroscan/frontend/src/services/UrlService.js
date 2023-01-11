export default {
  getFile(url) {
    return fetch(url)
      .then((resp) => resp.text());
  },
  getBase64(url) {
    return this.getFile(url)
      .then((data) => `data:model/obj;base64,${btoa(data)}`);
  },
};
