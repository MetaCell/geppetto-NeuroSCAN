import axios from 'axios';
import JSZip from 'jszip';

export default {
  zipFiles: [],
  getZipFile(url) {
    const zipFileEl = this.zipFiles.filter((zf) => zf.url === url);
    if (zipFileEl.length !== 0) return zipFileEl[0].zipFile;
    const newZipFile = axios.get(url, {
      responseType: 'arraybuffer',
    }).then((resp) => Buffer.from(resp.data, 'binary'))
      .then((zipContent) => JSZip().loadAsync(zipContent));
    this.zipFiles.push({
      url,
      zipFile: newZipFile,
    });
    return newZipFile;
  },
  async getBase64(zipFile, fileName) {
    const zipFileContent = await this.getZipFile(zipFile);
    return zipFileContent
      .file(fileName)
      .async('string')
      .then((data) => `data:model/obj;base64,${btoa(data)}`);
  },
};
