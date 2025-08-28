# Git Commit Standards

To maintain clear and consistent commit history, we follow professional Git commit standards:

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `bug`: Bug fix (synonymous with `fix`)
- `docs`: Documentation update
- `style`: Code formatting adjustment (changes that don't affect code meaning, such as whitespace, formatting, etc.)
- `refactor`: Code refactoring (code changes that neither fix bugs nor add features)
- `perf`: Performance optimization
- `test`: Test-related
- `build`: Build system or external dependency changes
- `ci`: CI configuration files and script changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Rollback previous commit

## Scope

Scope should identify the stage or component affected by the commit, such as:

- `stage1`
- `stage2/cli-tools`
- `stage3/user-api`
- `tests`
- `config`

## Commit Message Standards

**Important:** must use a genuine blank line (not using `\n` character) and run the script `scripts/clean_commit.sh` after committing.
1. Write commit messages in English
2. First line is a brief description (<72 characters)
3. Second line must be a genuine blank line (not using `\n` character)
4. Third line onwards is detailed description (optional)
5. Detailed description can include change reasons, impact scope, and other information
6. Make sure not to include temporary files generated during builds, and add them to .gitignore if necessary
7. Do not add Co-authored-by lines to commit messages

**Note:** When editing documentation files like this one, ensure that actual line breaks are used instead of `\n` characters for proper formatting.

## Examples

```
feat(stage1/calculator): implement basic arithmetic operations

- Add add, subtract, multiply, divide functions
- Add input validation
- Handle division by zero error
```

```
fix(stage2/cli): fix file path resolution in renamer

- Correct path handling for cross-platform compatibility
- Add tests for Windows path handling
```
