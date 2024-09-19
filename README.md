# GitHub Followers vs Following Comparator

This Node.js script allows you to compare your GitHub followers and following lists. It helps you identify:
- People you follow but who don't follow you back.
- People who follow you but whom you don't follow back.

## Features
- Fetches data from the GitHub API using basic authentication.
- Allows you to limit the number of results displayed.
- Provides an option to save the results to a file.
- Displays extra details (like GitHub profile URL and bio) with a verbose option.
- You can choose to view both followers and following differences, or just one of them.

## Repository
[GitHub Followers Comparator](https://github.com/NYOGamesCOM/GithubFollowersComparator.git)

## Prerequisites
- Node.js (v12.x or higher)
- A GitHub account and a [Personal Access Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/NYOGamesCOM/GithubFollowersComparator.git
    cd GithubFollowersComparator
    ```

2. Install dependencies:

    ```bash
    npm install node-fetch
    ```

3. Create a `.env` file in the root directory and add your GitHub credentials:

    ```bash
    GITHUB_USERNAME=your-github-username
    GITHUB_TOKEN=your-personal-access-token
    ```

    > **Note:** Ensure your personal access token has the correct scopes, such as `read:user`.

## Usage

To run the script, you can pass options to customize its behavior:

```js
compareFollowersAndFollowing({
  limit: 10,         // Limit results to 10 users (optional)
  saveToFile: true,   // Save the output to a text file (optional)
  fileName: 'results.txt', // Name of the file to save results (optional)
  show: 'both',       // Options: 'both', 'following', or 'followers' (optional)
  verbose: true       // Show extra details like profile URL and bio (optional)
});
