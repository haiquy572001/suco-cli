import { logger } from '@haiquy572001/suco-cli-log'
import { SwitchStatus } from '@haiquy572001/suco-cli-shared'
import fs from 'fs-extra'
import { describe, expect, it, vi } from 'vitest'

logger.setLevel('silent')

const rootCheck = vi.fn()
vi.mock('root-check', () => ({
  default: rootCheck,
}))

const { initialEnv, checkUserHome, checkNodeVersion, printLOGO, setLogLevel, rootDemotion } = await import(
  '../prepare.js'
)

describe('@haiquy572001/suco-cli -> prepare.ts', () => {
  it('When user home directory is not exists, will throw a error', () => {
    const spy = vi.spyOn(fs, 'pathExistsSync').mockReturnValueOnce(false)
    expect(checkUserHome).toThrow('home directory does not exist')
    spy.mockRestore()
  })

  it('Can initialize the necessary environment variables', () => {
    initialEnv()
    expect(process.env.VRN_CLI_DEBUG_ENABLED).toBe(SwitchStatus.Off)
    expect(process.env.VRN_CLI_NAME).toBe('vrn-cli')
    expect(process.env.VRN_CLI_PACKAGE_NAME).toBe('@haiquy572001/suco-cli')
  })

  it('When local Node.js version less than lowest requirements, will throw a error', () => {
    // process.version is a read-only property,
    // so we override the minimum requirements set in the previous case
    process.env.VRN_CLI_LOWEST_NODE_VERSION = '^100.0.0'
    expect(checkNodeVersion).toThrow('Please update your Node.js version')
  })

  it('Can print logo', () => {
    const clearSpy = vi.spyOn(logger, 'clearConsole').mockImplementationOnce(() => void 0)
    const logSpy = vi.spyOn(console, 'log').mockImplementationOnce(() => void 0)
    printLOGO()
    expect(clearSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalled()
    clearSpy.mockRestore()
    logSpy.mockRestore()
  })

  it('Can set global log level', () => {
    const setLevelSpy = vi.spyOn(logger, 'setLevel').mockImplementation(() => void 0)
    process.env.VRN_CLI_DEBUG_ENABLED = SwitchStatus.On
    setLogLevel()
    expect(setLevelSpy).toBeCalledWith('verbose')
    process.env.VRN_CLI_DEBUG_ENABLED = SwitchStatus.Off
    setLogLevel()
    expect(setLevelSpy).toBeCalledWith('info')
    setLevelSpy.mockRestore()
  })

  it('Demotion when executed with sudo', () => {
    rootDemotion()
    expect(rootCheck).not.toBeCalled()
    process.env.SUDO_USER = 'root'
    rootDemotion()
    expect(rootCheck).toBeCalled()
  })
})
