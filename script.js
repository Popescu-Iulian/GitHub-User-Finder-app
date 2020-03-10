// Search input
const USER_NAME = document.querySelector('input');

// Create user profile class
class GitHubUser {
  constructor() {
    this.client_id = '3f4f67fc720ce998f7cc';
    this.client_secret = '81a2b78d848b3e344cacc123067d3402dfa3833a'
  }

  // Fetch user profile data
  async getUser(user) {
    const PROFILE_RESPONSE = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const PROFILE_DATA = await PROFILE_RESPONSE.json();

    return {
      profile: PROFILE_DATA
    }
  }
}

// Initiate GitHubUser class
const GITHUB_USER = new GitHubUser;

// Search input event
function searchUser() {
  if (USER_NAME.value !== '') {
    // Make HTTP call
    GITHUB_USER.getUser(USER_NAME.value)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          // Show alert
        } else {
          // Show profile
        }
      })
  } else {
    // Clear profile
  }
}