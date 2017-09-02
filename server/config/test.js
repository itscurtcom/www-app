module.exports = {
  auth: {
    roles: {
      guest: ['*',],
      private: ['chuck',],
    },
    strategy: {
      id: 'fixed',
      fixed: {
        user: {
          id: 'chuck',
          name: 'Charles Yeager',
        },
      },
    },
  },
  cms: {
    store: {
      tag: {
        name: 'test',
      },
    },
  },
  contentful: {
    space: "test-space",
    key: "test-key",
  },
  logger: {
    transport: 'human',
  },
  routes: {
    client: {
      public: {
        foo: 'bar',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 13000,
  },
};
