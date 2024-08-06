function copyText(role) {
  let text = getTextByRole(role);
  navigator.clipboard.writeText(text).then(() => {
    alert(role + ' 内容已复制!');
  });
}

function importFromGitHub(role) {
  const urlInput = document.getElementById('urlInput-' + role);
  const url = urlInput.value;
  if (url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        if (json[role]) {
          saveTextByRole(role, json[role]);
          alert(role + ' 内容已导入!');
        } else {
          alert('JSON文件中没有找到' + role + '的内容');
        }
      })
      .catch(error => {
        alert('导入失败: ' + error.message);
      });
  } else {
    alert('请输入一个有效的GitHub文件URL');
  }
}

function getTextByRole(role) {
  return localStorage.getItem(role) || '';
}

function saveTextByRole(role, text) {
  localStorage.setItem(role, text);
}
