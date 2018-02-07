import add from 'moduleName'

// 这里的 moduleName 模块，返回 window.globalVariableName 这个值
// 所以就意味着 add 的值等同于 globalVariableName 的值
document.getElementById("root").innerText = add(1, 2, 3)