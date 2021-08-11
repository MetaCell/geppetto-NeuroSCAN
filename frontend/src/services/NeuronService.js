/* eslint class-methods-use-this:
    ["error", { "exceptMethods": ["getById",] }]
*/
export class NeuronService {
  async getById(id) {
    return {
      id,
      uid: 'TestUIDNeuron1',
      content: {
        type: 'url',
        location: 'https://raw.githubusercontent.com/MetaCell/geppetto-meta/master/geppetto.js/geppetto-ui/src/3d-canvas/showcase/examples/SketchVolumeViewer_SAAVR_SAAVR_1_1_0000_draco.gltf',
        fileName: 'SketchVolumeViewer_SAAVR_SAAVR_1_1_0000_draco.gltf',
      },
      getId: () => this.id,
    };
  }
}

export default new NeuronService();
