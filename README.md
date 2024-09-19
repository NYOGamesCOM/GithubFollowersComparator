# GitHub Followers vs Following Comparator

This script allows you to compare your GitHub followers and the users you are following. It identifies:
- People you follow but are not followed back.
- People who follow you but you are not following back.

## Features
- Uses the GitHub API to fetch the list of followers and following.
- Authenticates via GitHub username and personal access token.
- Outputs a list of:
  - Users you follow but don't follow you back.
  - Users who follow you but you don't follow back.

## Prerequisites
- Node.js (v12.x or higher)
- A GitHub account and a [Personal Access Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

## Installation

1. Clone the repository or download the script:

    ```bash
    git clone https://github.com/NYOGamesCOM/GithubFollowersComparator.git
    cd your-repository-folder
    ```

2. Install dependencies:

    ```bash
    npm install node-fetch
    ```

3. Create a `.env` file in the root directory and add your GitHub credentials:

    ```
    GITHUB_USERNAME=your-github-username
    GITHUB_TOKEN=your-personal-access-token
    ```

    > **Note:** Ensure your personal access token has the correct scopes, such as `read:user`.

## Usage

1. Run the script:

    ```bash
    node compare.js
    ```

2. The script will output two lists:
   - People you follow but who are not following you back.
   - People who follow you but whom you are not following back.

## Example Output

```bash
People you follow but are not followed back:
username1
username2

People who follow you but you are not following back:
username3
username4
