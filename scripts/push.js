const { exec } = require("child_process");

// 执行一系列Git命令
exec(
  'cd ./ookini-production && git add . && git commit -m "部署" && git push origin main',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`执行Git命令时出错：${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Git命令执行结果(错误)：${stderr}`);
      return;
    }
    console.log(`Git命令执行结果(成功)：${stdout}`);
  }
);
