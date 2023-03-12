const input = document.querySelector("input")
const renderUser = document.querySelector(".user-name")
const renderBio = document.querySelector(".user-bio")
const renderFollowers = document.querySelector(".user-followers")
const renderFollowing = document.querySelector(".user-following")
const renderNumberOfRepos = document.querySelector(".repos-number")
const renderRepos = document.querySelector(".repos")
const avatar = document.querySelector(".avatar")
let user = "paulina-filipiak"

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

async function renderNewUser() {
  await fetch(`https://api.github.com/users/${user}`)
    .then(function (res) {
      if (res.ok) {
        console.log("success")
      } else {
        throw new Error("no such user.")
      }
      return res.json()
    })
    .then(function (data) {
      if (data.name) {
        renderUser.textContent = data.name
        renderUser.classList.remove("centered")
      } else {
        renderUser.textContent = data.login
      }
      if (data.bio) {
        renderBio.textContent = data.bio
      } else {
        renderBio.textContent = "Description not provided"
      }
      renderFollowers.textContent = `${data.followers} Followers`
      renderFollowing.textContent = `${data.following} Following`
      renderNumberOfRepos.textContent = `${data.public_repos} Repos`
      avatar.src = data.avatar_url
      return fetch(`https://api.github.com/users/${user}/repos`)
    })
    .then(function (res) {
      if (res.ok) {
        console.log("success")
      } else {
        throw new Error("no such user.")
      }
      return res.json()
    })
    .then(function (data) {
      removeAllChildNodes(renderRepos)
      data = data.slice(0, 15)
      data.forEach((repo) => {
        const newLink = document.createElement("a")
        newLink.innerHTML = `<a href="${repo.svn_url}" target ="_blank" >${repo.name}</a>`
        renderRepos.appendChild(newLink)
      })
      return data
    })
    .catch((error) => {
      removeAllChildNodes(renderRepos)
      renderUser.textContent = "no such user :("
      document.querySelector(".render-user").classList.add("centered")
      renderBio.textContent = ""
      renderFollowers.textContent = ""
      renderFollowing.textContent = ""
      renderNumberOfRepos.textContent = ""
      avatar.src =
        "https://cdn-tp4.mozu.com/27977-44902/cms/44902/files/202300002409.jpg"
    })
}
renderNewUser()

input.addEventListener("change", function () {
  user = this.value
  renderNewUser()
})
