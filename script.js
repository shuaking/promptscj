document.addEventListener("DOMContentLoaded", function() {
    const githubUrl = "https://raw.githubusercontent.com/yourusername/yourrepo/main/yourfile.json"; // 替换为你的GitHub JSON文件地址

    fetch(githubUrl)
        .then(response => response.json())
        .then(data => {
            const roles = data.map(item => item.act);
            const prompts = data.map(item => item.prompt);

            const roleMenu = document.getElementById("roleItems");
            const promptMenu = document.getElementById("promptItems");
            const promptContent = document.getElementById("promptContent");

            roles.forEach((role, index) => {
                const roleItem = document.createElement("div");
                roleItem.className = "menu-item";
                roleItem.textContent = role;
                roleItem.addEventListener("click", () => {
                    promptMenu.innerHTML = "";
                    const promptArray = Array.isArray(prompts[index]) ? prompts[index] : [prompts[index]];
                    promptArray.forEach(prompt => {
                        const promptItem = document.createElement("div");
                        promptItem.className = "menu-item";
                        promptItem.textContent = prompt;
                        promptItem.addEventListener("click", () => {
                            promptContent.textContent = prompt;
                        });
                        promptMenu.appendChild(promptItem);
                    });
                });
                roleMenu.appendChild(roleItem);
            });

            document.getElementById("copyButton").addEventListener("click", () => {
                navigator.clipboard.writeText(promptContent.textContent)
                    .then(() => alert("提示词已复制到剪贴板"))
                    .catch(err => alert("复制失败: " + err));
            });
        })
        .catch(error => console.error("Error fetching JSON:", error));
});
