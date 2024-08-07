document.addEventListener("DOMContentLoaded", function() {
    const loadButton = document.getElementById("loadButton");

    loadButton.addEventListener("click", () => {
        const githubUrl = document.getElementById("githubUrlInput").value;
        if (githubUrl) {
            loadJsonData(githubUrl);
        } else {
            alert("请输入有效的 GitHub URL");
        }
    });

    function loadJsonData(url) {
        fetch(url)
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

                // 清空现有内容
                roleSelect.innerHTML = '<option value="" disabled selected>选择一个角色</option>';
                promptMenu.innerHTML = '';
                promptContent.textContent = '';

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
    }
});
