function copyText(role) {
  let text = getTextByRole(role);
  navigator.clipboard.writeText(text).then(() => {
    alert(role + ' 内容已复制!');
  });
}

function importText(role) {
  const fileInput = document.getElementById('fileInput-' + role);
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const json = JSON.parse(e.target.result);
        if (json[role]) {
          saveTextByRole(role, json[role]);
          alert(role + ' 内容已导入!');
        } else {
          alert('JSON文件中没有找到' + role + '的内容');
        }
      } catch (err) {
        alert('文件解析失败，请确保上传的是有效的JSON文件');
      }
    };
    reader.readAsText(file);
  } else {
    alert('请先选择一个JSON文件');
  }
}

function getTextByRole(role) {
  return localStorage.getItem(role) || '';
}

function saveTextByRole(role, text) {
  localStorage.setItem(role, text);
}
