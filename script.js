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
            const roleSelect = document.getElementById("roleSelect");
            const promptMenu = document.getElementById("promptItems");
            const promptContent = document.getElementById("promptContent");

            data.forEach((item, index) => {
                const roleOption = document.createElement("option");
                roleOption.value = index;
                roleOption.textContent = item.act;
                roleSelect.appendChild(roleOption);
            });

            roleSelect.addEventListener("change", () => {
                promptMenu.innerHTML = "";
                const selectedRoleIndex = roleSelect.value;
                const selectedRole = data[selectedRoleIndex];
                const promptItem = document.createElement("div");
                promptItem.className = "menu-item";
                promptItem.textContent = selectedRole.prompt;
                promptItem.addEventListener("click", () => {
                    promptContent.textContent = selectedRole.prompt;
                });
                promptMenu.appendChild(promptItem);
                // 自动选择提示词
                promptItem.click();
            });

            document.getElementById("copyButton").addEventListener("click", () => {
                if (promptContent.textContent) {
                    navigator.clipboard.writeText(promptContent.textContent)
                        .then(() => alert("提示词已复制到剪贴板"))
                        .catch(err => alert("复制失败: " + err));
                } else {
                    alert("没有提示词可以复制");
                }
            });
        })
        .catch(error => console.error("Error fetching JSON:", error));
});
