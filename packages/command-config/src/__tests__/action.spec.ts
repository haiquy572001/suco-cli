import type { BaseConfig } from '@haiquy572001/suco-cli-config-helper'
import { logger } from '@haiquy572001/suco-cli-log'
import { NPMRegistry, PackageManager, testShared } from '@haiquy572001/suco-cli-shared'
import { beforeAll, describe, expect, it, vi } from 'vitest'

logger.setLevel('silent')

let originConfig: BaseConfig = {
  npmRegistry: NPMRegistry.NPM,
  packageManager: PackageManager.NPM,
  checkUpdateEnabled: true,
}

const prompt = vi.fn(async () => ({}))
const readConfig = vi.fn(() => originConfig)
const updateConfig = vi.fn((config: Partial<BaseConfig>) => {
  originConfig = { ...originConfig, ...config }
})

vi.mock('@haiquy572001/suco-cli-command', async () => {
  const commandModule = await vi.importActual<typeof import('@haiquy572001/suco-cli-command')>(
    '@haiquy572001/suco-cli-command',
  )
  return {
    ...commandModule,
    prompt,
  }
})
vi.mock('@haiquy572001/suco-cli-config-helper', async () => {
  const configHelperModule = await vi.importActual<typeof import('@haiquy572001/suco-cli-config-helper')>(
    '@haiquy572001/suco-cli-config-helper',
  )
  return {
    ...configHelperModule,
    readConfig,
    updateConfig,
  }
})

const { Command, runAction } = await import('@haiquy572001/suco-cli-command')
const { ConfigAction } = await import('../action.js')

beforeAll(() => {
  testShared.injectTestEnv()
})

describe('@haiquy572001/suco-cli-command-config -> action.ts', () => {
  it('Can read current config', async () => {
    await runAction(ConfigAction)({}, new Command())
    expect(readConfig).toBeCalled()
  })

  it('Can update packageManager field in interactive mode', async () => {
    // selectField
    prompt.mockResolvedValueOnce({ field: 'packageManager' })
    // editItem
    prompt.mockResolvedValueOnce({ packageManager: PackageManager.Yarn })
    await runAction(ConfigAction)({}, new Command())
    expect(originConfig.packageManager).toBe(PackageManager.Yarn)
  })

  it('Can update npmRegistry field in interactive mode', async () => {
    prompt.mockResolvedValueOnce({ field: 'npmRegistry' })
    prompt.mockResolvedValueOnce({ npmRegistry: NPMRegistry.TAOBAO })
    await runAction(ConfigAction)({}, new Command())
    expect(originConfig.npmRegistry).toBe(NPMRegistry.TAOBAO)

    const CUSTOME_REGISTRY = 'https://registry.npm.vrndeco.cn'
    prompt.mockResolvedValueOnce({ field: 'npmRegistry' })
    prompt.mockResolvedValueOnce({ npmRegistry: 'custom', custom: CUSTOME_REGISTRY })
    await runAction(ConfigAction)({}, new Command())
    expect(originConfig.npmRegistry).toBe(CUSTOME_REGISTRY)
  })

  it('Can update checkUpdateEnabled field in interactive mode', async () => {
    prompt.mockResolvedValueOnce({ field: 'checkUpdateEnabled' })
    prompt.mockResolvedValueOnce({ yes: false })
    await runAction(ConfigAction)({}, new Command())
    expect(originConfig.checkUpdateEnabled).toBe(false)
  })
})
