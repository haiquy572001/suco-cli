import path from 'node:path'

import { testShared } from '@haiquy572001/suco-cli-shared'
import { beforeAll, describe, expect, it } from 'vitest'

import { CACHE_DIR_NAME } from '../common'
import { getCacheDirectory, isValidProjectName, isValidVersion } from '../utils.js'

beforeAll(() => {
  testShared.injectTestEnv()
})

describe('@haiquy572001/suco-cli-command-boilerplate -> utils.ts', () => {
  it('Can get cacheDirectory', () => {
    expect(getCacheDirectory()).toBe(path.resolve(process.env.VRN_CLI_HOME_PATH, CACHE_DIR_NAME))
  })

  it('Can verify a project name', () => {
    expect(isValidProjectName('cli-command-boilerplate')).toBe(true)
    expect(isValidProjectName('=cli-command-boilerplate')).toBe(false)
    expect(isValidProjectName('@haiquy572001/suco-cli-command-boilerplate')).toBe(true)
    expect(isValidProjectName('@haiquy572001/suco-cli-command-boilerplate/')).toBe(false)
    expect(isValidProjectName('-haiquy572001/suco-cli-command-boilerplate/')).toBe(false)
  })

  it('Can verify a version', () => {
    expect(isValidVersion('1.0.0')).toBe(true)
    expect(isValidVersion('1.0.0-beta.1')).toBe(true)
    expect(isValidVersion('v1.0.0')).toBe(false)
    expect(isValidVersion('a1.0.0')).toBe(false)
  })
})
