//create global variables
const overview = document.querySelector(".overview");
const username = "lucinda-d";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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

//add a click event to the entire list of repos
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    specifyRepo(repoName);
  }
});

//create a function to get a specifc repo
const specifyRepo = async function (repoName) {
  const grabRepo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await grabRepo.json();
  console.log(repoInfo);

  //grabbing languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);

  //create an array of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
    // console.log(languages);
  }

  //calling the function to display the repo info
  displaySpecificRepo(repoInfo, languages);
};

//create a function to display repo info
filterInput.classList.remove("hide"); //-displays the input element(searchbox)
const displaySpecificRepo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

  repoData.append(div);
  repoData.classList.remove("hide");
  repoSection.classList.add("hide");
};

//Add a click event to the "Back Button"
backToRepoButton.addEventListener("click", function () {
  repoSection.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepoButton.classList.add("hide");
});

//Add an Input Event to the Search Box
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  // console.log(searchText);//testing the input to see if it's been captured.
  const repos = document.querySelectorAll(".repo");
  const lowercaseSearchText = searchText.toLowerCase();

  //looping through each repos inside repos element
  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(lowercaseSearchText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
