@echo off
setlocal enabledelayedexpansion

for %%A in (%*) do (
  if "%%A"=="--no-verify" (
    echo.
    echo ERROR: --no-verify is disabled in this project.
    echo All pre-commit and commit-msg checks are mandatory.
    echo Fix your code or commit message to proceed.
    echo.
    exit /b 1
  )
  if "%%A"=="-n" (
    echo.
    echo ERROR: -n ^(--no-verify^) is disabled in this project.
    echo All pre-commit and commit-msg checks are mandatory.
    echo Fix your code or commit message to proceed.
    echo.
    exit /b 1
  )
)

git.exe %*
