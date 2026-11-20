import pty
import os
import select
import sys
import time

def run_ssh_command(remote_cmd, password, timeout=600):
    cmd = ["ssh", "-o", "StrictHostKeyChecking=no", "root@187.53.135.102", remote_cmd]
    pid, fd = pty.fork()
    if pid == 0:
        os.execvp(cmd[0], cmd)
    else:
        output = b""
        password_sent = False
        start_time = time.time()
        while time.time() - start_time < timeout:
            r, _, _ = select.select([fd], [], [], 0.5)
            if fd in r:
                try:
                    data = os.read(fd, 4096)
                    if not data:
                        break
                    output += data
                    sys.stdout.write(data.decode("utf-8", errors="replace"))
                    sys.stdout.flush()
                    if b"password:" in output.lower() and not password_sent:
                        os.write(fd, password.encode() + b"\n")
                        password_sent = True
                except OSError:
                    break
        os.close(fd)
        _, status = os.waitpid(pid, 0)
        return status, output.decode("utf-8", errors="replace")

if __name__ == "__main__":
    deploy_cmd = (
        "echo '=== STEP 1: GIT PULL ===' && "
        "cd /var/www/koikoitravel-app && "
        "git pull origin main && "
        "mkdir -p /var/www/koikoitravel-app/Backend/public/images/luxury-trains && "
        "cp -rn /var/www/koikoitravel-app/frontend/public/images/luxury-trains/* /var/www/koikoitravel-app/Backend/public/images/luxury-trains/ 2>/dev/null || true && "
        "echo '=== STEP 2: BUILD FRONTEND ===' && "
        "cd /var/www/koikoitravel-app/frontend && "
        "rm -rf .next/cache && "
        "npm run build && "
        "echo '=== STEP 3: RESTART PM2 ===' && "
        "pm2 restart koikoi-frontend && "
        "echo '=== DEPLOY COMPLETE ===' && "
        "pm2 status"
    )
    status, out = run_ssh_command(deploy_cmd, "Rajnish@#125", timeout=600)
    print("\nExit status:", status)
