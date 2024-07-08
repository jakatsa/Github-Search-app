document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#github-form");
  let search = document.querySelector("#search");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search = e.target.search.value;
    handleSearch(search);

    function handleSearch() {
      fetch("https://api.github.com/search/users?q=" + search)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const userlist = document.getElementById("user-list");
          data.items.forEach((user) => {
            userlist.innerHTML = `User:${user.login}   <img src=${user.avatar_url} /> <p>URL:<a href="${user.html_url}">${user.html_url}</a></p>`;
            const repoButton = document.createElement("button");
            repoButton.textContent = "Show repositories";
            userlist.appendChild(repoButton);
            console.log(repoButton);
            repoButton.addEventListener("click", () => {
              fetch("https://api.github.com/users/jakatsa/repos")
                .then((res) => res.json())
                .then((data) => {
                  data.forEach((repo) => {
                    let repoCard = document.createElement("li");
                    repoCard.innerHTML = `
                        <h4>Repository Name: ${repo.name} </h4>
                        <p>Repository Url:  <a href="${repo.html_url}">${repo.html_url}</a></p>
                        `;
                    document.querySelector("#repos-list").appendChild(repoCard);
                  });
                })
                .catch((error) => console.error("Error fetching data:", error));
            });
          });
        });
    }
  });
});
