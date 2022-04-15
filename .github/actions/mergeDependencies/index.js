const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const token = core.getInput("token");
  const octokit = github.getOctokit(token);

  await octokit.rest.pulls.merge({
    ...github.context.repo,
    pull_number: github.context.issue.number
  });

  core.info("Should be merged now");
}

run();
