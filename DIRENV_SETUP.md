# Direnv Setup Instructions

These are the steps used to set up `direnv` for the repository, enabling the `.envrc` file (which adds `bin` to your PATH) to automatically load when you enter the project directory. This allows the git wrapper to work without manual intervention.

## Prerequisites
- Homebrew must be installed (it was already present on the system).
- The repository already has a `.envrc` file with `PATH_add bin`.

## Steps Performed

1. **Check if direnv is installed**:
   - Command: `command -v direnv || true`
   - Result: It wasn't installed, so proceeded to install it.

2. **Install direnv via Homebrew**:
   - Command: `brew install direnv`
   - This installed direnv (version 2.37.1) and its dependencies (ncurses, readline, bash).

3. **Allow the repository's .envrc file**:
   - Command: `direnv allow`
   - This whitelisted the `.envrc` in the repository so direnv can load it.

4. **Add direnv shell integration to ~/.zshrc**:
   - Edited `~/.zshrc` to append:
     ```
     # direnv shell integration
     if command -v direnv >/dev/null 2>&1; then
       eval "$(direnv hook zsh)"
     fi
     ```
   - This ensures direnv hooks into your zsh shell to automatically load/unload environment files.

5. **Reload the shell configuration**:
   - Command: `source ~/.zshrc`
   - This activated the direnv hook in the current shell session.

6. **Verify direnv status**:
   - Command: `direnv status`
   - Confirmed it detected and loaded the `.envrc` file.

7. **Update README.md with setup instructions**:
   - Added a section in `README.md` explaining how to install and enable direnv for future users:
     ```
     If you want the repository-local git wrapper and `.envrc` to activate automatically, install and enable direnv:

     ```bash
     brew install direnv
     echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
     source ~/.zshrc
     cd /path/to/husky-poc
     direnv allow
     ```
     ```

## Notes
- After these steps, opening a new terminal in the repo directory should automatically prepend `bin` to your PATH via direnv, making `git` resolve to the wrapper.
- If you open a new terminal, you may need to `cd` into the repo again for direnv to trigger.
- The git alias approach (from earlier) was an alternative that didn't require direnv, but direnv was requested specifically.