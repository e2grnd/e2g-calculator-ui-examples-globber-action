import * as core from '@actions/core'
import * as glob from '@actions/glob'

async function run(): Promise<void> {
  try {
    // const basePath = core.getInput('search-base-path', {required: false})
    const globber = await glob.create(`/static/examples/**/*.json`)
    const files = await globber.glob()
    core.debug(`Files: ${files.join(',')}`)
    core.setOutput('files', files)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
