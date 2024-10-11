import { logger } from '@haiquy572001/suco-cli-log'
import { testShared } from '@haiquy572001/suco-cli-shared'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

// disabled logger
logger.setLevel('silent')

const readConfig = vi.fn()
const updateConfig = vi.fn()
const queryPackageLatestVersion = vi.fn(async () => '1.0.0')

vi.mock('@haiquy572001/suco-cli-config-helper', async () => {
  const configHelper = await vi.importActual<typeof import('@haiquy572001/suco-cli-config-helper')>(
    '@haiquy572001/suco-cli-config-helper',
  )
  return {
    ...configHelper,
    readConfig,
    updateConfig,
  }
})

vi.mock('@haiquy572001/suco-cli-npm-helper', async () => {
  const npmHelper = await vi.importActual<typeof import('@haiquy572001/suco-cli-npm-helper')>(
    '@haiquy572001/suco-cli-npm-helper',
  )
  return {
    ...npmHelper,
    queryPackageLatestVersion,
  }
})

const { checkUpdate } = await import('../index.js')

const logSpy = vi.spyOn(console, 'log')

beforeAll(() => {
  testShared.injectTestEnv()
})

afterEach(() => {
  readConfig.mockReset()
  updateConfig.mockReset()
  queryPackageLatestVersion.mockReset()
  logSpy.mockReset()
})

afterAll(() => {
  logSpy.mockRestore()
})

describe('@haiquy572001/suco-cli-check-update', () => {
  it('When config.checkUpdateEnabled is disabled, not check upate', async () => {
    readConfig.mockReturnValueOnce({ checkUpdateEnabled: false })
    await expect(checkUpdate()).resolves.toBeUndefined()
    expect(updateConfig).not.toBeCalled()
  })

  it('When config.checkUpdateLastTime is not expired, not check upate', async () => {
    readConfig.mockReturnValueOnce({ checkUpdateEnabled: true, checkUpdateLastTime: Date.now() })
    await expect(checkUpdate()).resolves.toBeUndefined()
    expect(updateConfig).not.toBeCalled()
  })

  it('When current version is latest version, update only config.checkUpdateLastTime', async () => {
    readConfig.mockReturnValueOnce({ checkUpdateEnabled: true })
    await expect(checkUpdate()).resolves.toBeUndefined()
    expect(logSpy).not.toBeCalled()
    expect(updateConfig).toBeCalled()
  })

  it('When current version is less than latest version, print log and update config.checkUpdateLastTime', async () => {
    readConfig.mockReturnValueOnce({ checkUpdateEnabled: true })
    queryPackageLatestVersion.mockReturnValueOnce(Promise.resolve('1.0.1'))
    await expect(checkUpdate()).resolves.toBeUndefined()
    expect(logSpy).toBeCalled()
    expect(updateConfig).toBeCalled()
  })

  it('Failure to check updates does not throw an error', async () => {
    readConfig.mockReturnValueOnce({ checkUpdateEnabled: true })
    queryPackageLatestVersion.mockReturnValueOnce(Promise.reject(new Error('BOOM')))
    // still resolved
    await expect(checkUpdate()).resolves.toBeUndefined()
    expect(updateConfig).not.toBeCalled()
  })
})
