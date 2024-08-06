document.addEventListener('DOMContentLoaded', function() {
    const jsonUrl = 'https://raw.githubusercontent.com/your-repository/your-file.json';
    const contentDiv = document.getElementById('content');
    const copyButton = document.getElementById('copyButton');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    const jsonInput = document.getElementById('jsonInput');
    const loadJsonButton = document.getElementById('loadJsonButton');
    const jsonDisplay = document.getElementById('jsonDisplay'); // 用于显示导入的JSON数据

    let data = [];
    let filteredData = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    function fetchJsonData(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应失败');
                }
                return response.json();
            })
            .then(jsonData => {
                data = jsonData;
                filteredData = data;
                populateFilterOptions();
                renderPage();
            })
            .catch(error => {
                contentDiv.textContent = '无法获取数据：' + error.message;
            });
    }

    function populateFilterOptions() {
        filterSelect.innerHTML = '<option value="">选择过滤条件</option>';
        const uniqueValues = new Set(data.map(item => item.category)); // 假设每个item有一个category属性
        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            filterSelect.appendChild(option);
        });
    }

    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = filteredData.slice(start, end);
        contentDiv.textContent = JSON.stringify(pageData, null, 2);
        pageInfo.textContent = `第 ${currentPage} 页，共 ${Math.ceil(filteredData.length / itemsPerPage)} 页`;
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        filteredData = data.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm));
        currentPage = 1;
        renderPage();
    });

    filterSelect.addEventListener('change', function() {
        const filterValue = filterSelect.value;
        if (filterValue) {
            filteredData = data.filter(item => item.category === filterValue); // 假设每个item有一个category属性
        } else {
            filteredData = data;
        }
        currentPage = 1;
        renderPage();
    });

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            currentPage++;
            renderPage();
        }
    });

    copyButton.addEventListener('click', function() {
        const range = document.createRange();
        range.selectNode(contentDiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? '复制成功！' : '复制失败！';
            alert(msg);
        } catch (err) {
            alert('复制失败！');
        }

        window.getSelection().removeAllRanges();
    });

    loadJsonButton.addEventListener('click', function() {
        try {
            const userInput = JSON.parse(jsonInput.value);
            data = userInput;
            filteredData = data;
            populateFilterOptions();
            currentPage = 1;
            renderPage();
            jsonDisplay.textContent = JSON.stringify(userInput, null, 2); // 显示导入的JSON数据
        } catch (error) {
            alert('JSON格式不正确，请重新输入');
        }
    });

    fetchJsonData(jsonUrl); // 初始加载GitHub上的JSON数据
});
