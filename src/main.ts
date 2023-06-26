import * as core from '@actions/core'
import * as glob from '@actions/glob'

async function run(): Promise<void> {
  try {
    const maxStr = core.getInput('max-files', {required: false})
    const max = parseInt(maxStr, 10) || 100
    const globber = await glob.create(`static/examples/**/*.json`)
    const files = await globber.glob()
    core.debug(`Files: ${files.slice(0, max).join(',')}`)
    core.setOutput('files', files)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
