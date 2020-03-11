const USER_NAME = document.querySelector('input');
const USERNAME_PROFILE = document.getElementById('username-profile');
const ALERT_MSG = document.querySelector('.hidden');

// Fetch user profile data
class GetGitHubProfile {
  constructor() {
    this.client_id = '3f4f67fc720ce998f7cc';
    this.client_secret = '81a2b78d848b3e344cacc123067d3402dfa3833a';
  }

  async getUserProfile(username) {
    const PROFILE_RESPONSE = await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const PROFILE_DATA = await PROFILE_RESPONSE.json();

    return {
      profile: PROFILE_DATA
    }
  }
}

// Display fetched user profile data
class DisplayGitHubProfile {
  constructor() {
    this.profile = USERNAME_PROFILE;
  }

  displayUserProfile(username) {
    USERNAME_PROFILE.innerHTML = `
      <div>
        <div>
          <div>
            <img src="${username.avatar_url}" alt="" />
            <button><a href="${username.html_url}">View Profile</a></button>
          </div>
          <div>
            <span>Public Repos: ${username.public_repos}</span>
            <span>Public Gists: ${username.public_gists}</span>
            <span>Followers: ${username.followers}</span>
            <span>Following: ${username.following}</span>
            <ul>
              <li>Location: ${username.location}</li>
              <li>Website/Blog: ${username.blog}</li>
              <li>Member since: ${username.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3>Latest Repos</h3>
      <div id="username-repos"></div>
    `;
  }

  // Show alerg message to display
  displayNotFound() {
    USERNAME_PROFILE.innerHTML = `
      <h3 class="alert">Username Not Found!</h3>
    `;
  }
}

// Initialise GitHubUser class
const GITHUB_USER = new GetGitHubProfile;

// Initialise DisplayProfile class
const DISPLAY_PROFILE = new DisplayGitHubProfile;

// Event that trigger search and display
function searchUser() {
  // Make HTTP call for user profile
  GITHUB_USER.getUserProfile(USER_NAME.value)
    .then(data => {
      if (data.profile.message === 'Not Found') {
        // Show alert
        DISPLAY_PROFILE.displayNotFound();
      } else {
        // Display profile
        DISPLAY_PROFILE.displayUserProfile(data.profile);
      }
    })
}