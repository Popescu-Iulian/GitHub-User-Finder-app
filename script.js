const USER_NAME = document.querySelector('input');
const USERNAME_PROFILE = document.getElementById('username-profile');

// Fetch username profile data
class GetGitHubProfile {
  constructor() {
    this.client_id = '3f4f67fc720ce998f7cc';
    this.client_secret = '81a2b78d848b3e344cacc123067d3402dfa3833a';
  }

  async getUserProfile(username) {
    const PROFILE_RESPONSE = await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const REPOS_RESPONSE = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const PROFILE_DATA = await PROFILE_RESPONSE.json();
    const REPOS_DATA = await REPOS_RESPONSE.json();

    return {
      profile: PROFILE_DATA,
      repos: REPOS_DATA
    }
  }
}

// Display fetched username profile data
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

  displayUserRepos(repos) {
    const USERNAME_REPOS = document.getElementById('username-repos');
    let str = '';

    repos.forEach((repo) => {
      str += `
        <div>
          <div>
            <div>
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div>
              <span>Stars: ${repo.stargazers_count}</span>
              <span>Watchers: ${repo.watchers_count}</span>
              <span>Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    USERNAME_REPOS.innerHTML = str;
  }

  // Display alerg message
  displayNotFound() {
    USERNAME_PROFILE.innerHTML = `
      <div class="alert">
        <h3 class="alert-msg">Username Not Found!</h3>
      </div>
    `;
  }
}

// Initialise GitHubUser object
const GITHUB_USER = new GetGitHubProfile;

// Initialise DisplayProfile object
const DISPLAY_PROFILE = new DisplayGitHubProfile;

// Event that trigger search and display
function searchUser() {
  // Make HTTP call for username profile
  GITHUB_USER.getUserProfile(USER_NAME.value)
    .then(data => {
      if (data.profile.message === 'Not Found') {
        // Display alert
        DISPLAY_PROFILE.displayNotFound();
      } else {
        // Display profile
        DISPLAY_PROFILE.displayUserProfile(data.profile);
        DISPLAY_PROFILE.displayUserRepos(data.repos);
      }
    })
}