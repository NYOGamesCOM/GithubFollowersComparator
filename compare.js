const fetch = require('node-fetch');
require('dotenv').config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

async function compareFollowersAndFollowing() {
  const followersUrl = `https://api.github.com/users/${username}/followers`;
  const followersResponse = await fetch(followersUrl, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`
    }
  });

  const followersData = await followersResponse.json();
  const followingUrl = `https://api.github.com/users/${username}/following`;

  const followingResponse = await fetch(followingUrl, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`
    }
  });

  const followingData = await followingResponse.json();
  const followerUsernames = new Set(followersData.map(follower => follower.login));
  const followingUsernames = new Set(followingData.map(following => following.login));

  const notFollowedBack = [...followingUsernames].filter(username => !followerUsernames.has(username));
  const notFollowingBack = [...followerUsernames].filter(username => !followingUsernames.has(username));

  console.log("People you follow but are not followed back:");
  notFollowedBack.forEach(username => console.log(username));

  console.log("\nPeople who follow you but you are not following back:");
  notFollowingBack.forEach(username => console.log(username));
}

compareFollowersAndFollowing();
