// Search input
const USER_NAME = document.querySelector('input');
const USER_PROFILE = document.getElementById('user-profile');

// Create user profile class
class GitHubUser {
  constructor() {
    this.client_id = '3f4f67fc720ce998f7cc';
    this.client_secret = '81a2b78d848b3e344cacc123067d3402dfa3833a';
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

// Initialise GitHubUser class
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
          // Display profile
          DISPLAY_PROFILE.displayUserProfile(data.profile);
        }
      })
  } else {
    // Clear profile
  }
}

//
class DisplayProfile {
  constructor() {
    this.profile = USER_PROFILE;
  }

  // Display user data
  displayUserProfile(user) {
    USER_PROFILE.innerHTML = `
      <div>
        <div>
          <div>
            <img src="${user.avatar_url}" alt="" />
            <button><a href="${user.html_url}">View Profile</a></button>
          </div>
          <div>
            <span>Public Repos: ${user.public_repos}</span>
            <span>Public Gists: ${user.public_gists}</span>
            <span>Followers: ${user.followers}</span>
            <span>Following: ${user.following}</span>
            <ul>
              <li>Company: ${user.company}</li>
              <li>Location: ${user.location}</li>
              <li>Website/Blog: ${user.blog}</li>
              <li>Member since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3>Latest Repos</h3>
      <div id="user-repos"></div>
    `;
  }
}

// Initialise DisplayProfile class
const DISPLAY_PROFILE = new DisplayProfile;