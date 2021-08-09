module.exports = {
  settings: {
    parser: {
      formLimit: '50mb',
      jsonLimit: '50mb',
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 10737418240
      }
    },
    cors: {
      origin: ['http://localhost:8000'],
    },
  },
};

