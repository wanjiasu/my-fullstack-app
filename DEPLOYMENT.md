# 部署指南

## 问题解决

### 前端权限错误修复

之前遇到的 `EACCES: permission denied, mkdir '/app/.next'` 错误已经通过以下方式修复：

1. **修改了 `nextjs-frontend/Dockerfile`**：
   - 添加了 `RUN chown -R node:node /app` 来确保 node 用户对 `/app` 目录有完整权限
   - 在切换到 node 用户之前设置正确的文件所有权

2. **添加了生产环境 Dockerfile (`Dockerfile.prod`)**：
   - 使用多阶段构建优化镜像大小
   - 只安装生产依赖
   - 使用 `pnpm start` 而不是 `pnpm dev`

## 部署选项

### 开发环境部署
```bash
docker-compose up --build
```

### 生产环境部署
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### 云服务器部署建议

1. **使用生产环境配置**：
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

2. **环境变量设置**：
   - 确保设置正确的 `API_BASE_URL`
   - 配置数据库连接字符串
   - 设置邮件服务器配置

3. **端口映射**：
   - 前端：3000
   - 后端：8000
   - 数据库：5432
   - MailHog UI：8025

4. **持久化数据**：
   - 数据库数据存储在 `postgres_data` volume 中
   - 确保定期备份数据

## 故障排除

### 权限问题
如果仍然遇到权限问题，检查：
1. Docker 容器内的用户权限
2. 文件系统的挂载权限
3. SELinux 或 AppArmor 设置（如果适用）

### 网络问题
- 确保容器间可以通过服务名相互访问
- 检查防火墙设置
- 验证端口映射配置

### 构建问题
- 清理 Docker 缓存：`docker system prune -a`
- 重新构建镜像：`docker-compose build --no-cache`
