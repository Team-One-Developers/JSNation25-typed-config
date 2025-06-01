import type { Config } from "jest";
import { createDefaultPreset } from "ts-jest";

const config: Config = {
  automock: true,
  bail: 1,
  resetMocks: true,
  testEnvironment: "node",
  verbose: true,
  transform: {
    ...createDefaultPreset().transform,
  },
};

export default config;
