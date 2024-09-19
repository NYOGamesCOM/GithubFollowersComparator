const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

async function fetchGitHubData(url) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`
    }
  });

  return await response.json();
}

async function compareFollowersAndFollowing(options = {}) {
  const followersUrl = `https://api.github.com/users/${username}/followers`;
  const followingUrl = `https://api.github.com/users/${username}/following`;

  const followersData = await fetchGitHubData(followersUrl);
  const followingData = await fetchGitHubData(followingUrl);

  const followerUsernames = new Set(followersData.map(follower => follower.login));
  const followingUsernames = new Set(followingData.map(following => following.login));

  const notFollowedBack = [...followingUsernames].filter(user => !followerUsernames.has(user));
  const notFollowingBack = [...followerUsernames].filter(user => !followingUsernames.has(user));

  // Apply result limits if provided
  const limitedNotFollowedBack = options.limit ? notFollowedBack.slice(0, options.limit) : notFollowedBack;
  const limitedNotFollowingBack = options.limit ? notFollowingBack.slice(0, options.limit) : notFollowingBack;

  let output = '';

  if (options.show === 'both' || options.show === 'following') {
    output += "People you follow but are not followed back:\n";
    limitedNotFollowedBack.forEach(username => {
      output += `${username}`;
      if (options.verbose) {
        const user = followingData.find(f => f.login === username);
        output += ` - ${user.html_url} (Bio: ${user.bio || 'No bio'})`;
      }
      output += '\n';
    });
    output += '\n';
  }

  if (options.show === 'both' || options.show === 'followers') {
    output += "People who follow you but you are not following back:\n";
    limitedNotFollowingBack.forEach(username => {
      output += `${username}`;
      if (options.verbose) {
        const user = followersData.find(f => f.login === username);
        output += ` - ${user.html_url} (Bio: ${user.bio || 'No bio'})`;
      }
      output += '\n';
    });
  }

  console.log(output);

  // Save to file if the option is enabled
  if (options.saveToFile) {
    const fileName = options.fileName || 'github_comparison.txt';
    fs.writeFileSync(fileName, output);
    console.log(`Results saved to ${fileName}`);
  }
}

compareFollowersAndFollowing({
  limit: 10,         // Limit results to 10 users
  saveToFile: true,   // Save the output to a text file
  fileName: 'results.txt', // Name of the file to save results
  show: 'both',       // Options: 'both', 'following', or 'followers'
  verbose: true       // Show extra details about each user
});
