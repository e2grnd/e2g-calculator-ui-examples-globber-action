import * as core from '@actions/core'
import {promises as fs} from 'fs'
import path from 'path'

async function run(): Promise<void> {
  try {
    const maxStr = core.getInput('max-files', {required: false})
    const excludeCalcs = (core.getInput('exclude-calcs') || '').split(',').map(i => i.trim())
    core.debug(`Exclude Calcs: ${excludeCalcs.join(',')}`)
    const max = parseInt(maxStr, 10) || 100
    const allCalcs = (await fs.readdir(path.resolve('src/calculators'), {withFileTypes: true}))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    core.debug(`All Calcs: ${allCalcs}`)
    const includeCalcs = (core.getInput('calcs') || '').split(',').map(i => i.trim())
    core.debug(`Include Calcs raw: ${core.getInput('calcs')}`)
    core.debug(`Include Calcs (${includeCalcs.length}): ${includeCalcs.join(',')}`)
    let calcs = allCalcs
    core.debug(`Calcs after exclude: ${calcs.length} ${calcs.join(',')} ${typeof calcs}`)
    if (includeCalcs.length > 0) {
      calcs = allCalcs.filter(d => includeCalcs.includes(d))
    }
    calcs = calcs.filter(d => !excludeCalcs.includes(d)).slice(0, max)
    core.debug(`Calcs: ${calcs.join(',')}`)
    core.setOutput('calcs', calcs)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
