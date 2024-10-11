import { Command, runAction } from '@haiquy572001/suco-cli-command'
import { logger } from '@haiquy572001/suco-cli-log'
import { testShared } from '@haiquy572001/suco-cli-shared'
import fs from 'fs-extra'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

logger.setLevel('silent')

// mock fs.existsSync and fs.removeSync
const fsExistsSyncSpy = vi.spyOn(fs, 'existsSync').mockImplementation(() => true)
const fsRemoveSyncSpy = vi.spyOn(fs, 'removeSync').mockImplementation(() => void 0)

const { ClearAction } = await import('../../clear/clear.action.js')

beforeAll(() => {
  testShared.injectTestEnv()
})

beforeEach(() => {
  fsExistsSyncSpy.mockClear()
  fsRemoveSyncSpy.mockClear()
})

afterAll(() => {
  fsExistsSyncSpy.mockRestore()
  fsRemoveSyncSpy.mockRestore()
})

describe('@haiquy572001/suco-cli-command-boilerplate -> clear -> clear.action.ts', () => {
  it('should be confirmed and cleaned cache', async () => {
    await runAction(ClearAction)(new Command())
    expect(fsExistsSyncSpy).toBeCalled()
    expect(fsRemoveSyncSpy).toBeCalled()
  })
})
