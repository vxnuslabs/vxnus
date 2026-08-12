import pty
import os
import sys

def run():
    pid, fd = pty.fork()
    if pid == 0:
        os.execvp("npx", ["npx", "drizzle-kit", "push"])
    else:
        output = b""
        while b"execute all statements" not in output:
            try:
                chunk = os.read(fd, 1024)
                output += chunk
                sys.stdout.write(chunk.decode(errors='ignore'))
                sys.stdout.flush()
            except Exception:
                break
        
        os.write(fd, b"\x1b[B\r")
        
        while True:
            try:
                chunk = os.read(fd, 1024)
                if not chunk: break
                sys.stdout.write(chunk.decode(errors='ignore'))
                sys.stdout.flush()
            except OSError:
                break
        os.waitpid(pid, 0)

run()
