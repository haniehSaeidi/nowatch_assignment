module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^api/(.*)$": "<rootDir>/src/api/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
    "^assets/(.*)$": "<rootDir>/src/assets/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
