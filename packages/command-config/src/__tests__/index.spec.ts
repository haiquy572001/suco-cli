import { Command } from '@haiquy572001/suco-cli-command'
import { describe, expect, it } from 'vitest'

import ConfigCommand from '../index.js'

describe('@haiquy572001/suco-cli-command-config -> index.ts', () => {
  it('Correct exported', () => {
    expect(ConfigCommand).toBeInstanceOf(Command)
  })
})
