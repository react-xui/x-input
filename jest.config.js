module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'], // 运行测试前可执行的脚本（比如注册enzyme的兼容）
    transform: {
      '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    },
    "moduleNameMapper": {
      "^components(.*)$": "<rootDir>/src/components$1",
    },
    "testRegex": "src/__test__/.*.test.js$",
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], //转换时需忽略的文件
    testURL: 'http://localhost/', // 运行环境下的URl
  };