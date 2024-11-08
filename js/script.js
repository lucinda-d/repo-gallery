//create global variables
const overview = document.querySelector(".overview");
const username = "lucinda-d";
const repoList = document.querySelector(".repo-list");

//fetch API JSON data
const grabProfileInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  // console.log(data);
  displayUser(data);
};

grabProfileInfo();

//fetch and display user information
const displayUser = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(div);
  repoFetch();
};

//fetch your repos
const repoFetch = async function () {
  const gitRepo = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await gitRepo.json();
  // console.log(repoData);
  displayRepoInfo(repoData);
};

//display info about your repos
const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const repoListItem = document.createElement("li");
    repoListItem.classList.add("repo");
    repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoListItem);
  }
};
