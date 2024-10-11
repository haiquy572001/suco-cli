import { Command } from '@haiquy572001/suco-cli-command'
import { describe, expect, it } from 'vitest'

import clearCommand from '../../clear/clear.command.js'

describe('@haiquy572001/suco-cli-command-boilerplate -> clear -> clear.command.ts', () => {
  it('Correct exported', () => {
    expect(clearCommand).toBeInstanceOf(Command)
  })
})
