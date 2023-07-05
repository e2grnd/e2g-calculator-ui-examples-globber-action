import * as core from '@actions/core'
import {promises as fs} from 'fs'
import path from 'path'

async function run(): Promise<void> {
  try {
    const maxStr = core.getInput('max-files', {required: false})
    const excludeCalcs = (core.getInput('exclude-calcs') || '')
      .split(',')
      .map(i => i.trim())
    const max = parseInt(maxStr, 10) || 100
    const allCalcs = (
      await fs.readdir(path.resolve('src/calculators'), {withFileTypes: true})
    )
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    const includeCalcs = (core.getInput('calcs') || '')
      .split(',')
      .map(i => i.trim())
    let calcs = allCalcs.filter(d => !excludeCalcs.includes(d)).slice(0, max)
    if (includeCalcs.length > 0) {
      calcs = allCalcs.filter(d => includeCalcs.includes(d))
    }
    core.debug(`Calcs: ${calcs.join(',')}`)
    core.setOutput('calcs', calcs)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
