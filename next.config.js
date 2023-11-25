/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "",
        permanent: true,
      },
      {
        source: "/deploy",
        destination: "", // <- The path you want to redirect to in order to create a new agent (if you want to enable this feature,
        permanent: true,
      },
    ];
  },
  env: {
    REACT_APP_ASSISTANT_ID: process.env.REACT_APP_ASSISTANT_ID,
  },
};

module.exports = nextConfig;