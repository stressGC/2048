/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	// All imported modules in your tests should be mocked automatically
	// automock: false,

	// Stop running tests after `n` failures
	// bail: 0,

	// The directory where Jest should store its cached dependency information
	// cacheDirectory: "/tmp/jest_rs",

	// Automatically clear mock calls, instances and results before every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	// collectCoverageFrom: undefined,
	collectCoverageFrom: ["src/**/*.{ts,tsx}"],

	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",

	// Indicates which provider should be used to instrument code for coverage
	// coverageProvider: "babel",

	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: [
		// "json",
		"text",
		"lcov",
		// "clover",
	],

	// An array of file extensions your modules use
	moduleFileExtensions: ["ts", "tsx", "js"],

	// Use this configuration option to add custom reporters to Jest
	reporters: ["default", ["jest-junit", { outputDirectory: "./jest-junit", outputName: "junit.xml" }]],

	// The test environment that will be used for testing
	testEnvironment: "jsdom",

	// A map from regular expressions to paths to transformers
	transform: {
		"^.+\\.tsx?$": "babel-jest",
	},
}
