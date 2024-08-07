document.addEventListener("DOMContentLoaded", function() {
    const githubUrl = "https://raw.githubusercontent.com/shuaking/promptscj/main/prompts-zh.json"; // 替换为你的GitHub JSON文件地址

    fetch(githubUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const roleMenu = document.getElementById("roleItems");
            const promptMenu = document.getElementById("promptItems");
            const promptContent = document.getElementById("promptContent");

            data.forEach((item, index) => {
                const roleItem = document.createElement("div");
                roleItem.className = "menu-item";
                roleItem.textContent = item.act;
                roleItem.addEventListener("click", () => {
                    promptMenu.innerHTML = "";
                    const promptItem = document.createElement("div");
                    promptItem.className = "menu-item";
                    promptItem.textContent = item.prompt;
                    promptItem.addEventListener("click", () => {
                        promptContent.textContent = item.prompt;
                    });
                    promptMenu.appendChild(promptItem);
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
