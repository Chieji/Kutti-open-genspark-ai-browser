module.exports = {
  apps: [
    {
      name: "genspark-ai-browser",
      script: "node_modules/.bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true,
      watch: false,
      max_memory_restart: "2G",
      merge_logs: true,
    },
  ],
}
