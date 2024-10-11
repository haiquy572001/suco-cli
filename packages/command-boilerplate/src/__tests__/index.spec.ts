import { Command } from '@haiquy572001/suco-cli-command'
import { describe, expect, it } from 'vitest'

import boilerplateCommand, { createCommand } from '../index.js'

describe('@haiquy572001/suco-cli-command-boilerplate -> index.ts', () => {
  it('Correct exported', () => {
    expect(boilerplateCommand).toBeInstanceOf(Command)
    expect(createCommand).toBeInstanceOf(Command)
  })
})
