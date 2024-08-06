document.addEventListener('DOMContentLoaded', function() {
    // GitHub JSON文件的URL
    const jsonUrl = 'https://raw.githubusercontent.com/your-repository/your-file.json';

    // 获取DOM元素
    const contentDiv = document.getElementById('content');
    const copyButton = document.getElementById('copyButton');

    // 使用fetch获取JSON数据
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // 将JSON数据显示在网页中
            contentDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            contentDiv.textContent = '无法获取数据：' + error;
        });

    // 复制功能
    copyButton.addEventListener('click', function() {
        const range = document.createRange();
        range.selectNode(contentDiv);
        window.getSelection().removeAllRanges(); // 清除当前的选中
        window.getSelection().addRange(range); // 选中内容

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? '复制成功！' : '复制失败！';
            alert(msg);
        } catch (err) {
            alert('复制失败！');
        }

        window.getSelection().removeAllRanges(); // 清除选中
    });
});
