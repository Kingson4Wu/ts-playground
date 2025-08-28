# Notes and Best Practices

1. Use TypeScript's type system to catch errors at compile time
2. Write unit tests to verify core functionality
3. Use code coverage tools to ensure test quality (target coverage > 80%)
4. Follow the established project structure for consistency
5. Document all public APIs and complex logic
6. Use ESLint and Prettier for consistent code style
7. Regularly review and update all scripts to ensure they function correctly with current project dependencies
8. Verify that project builds and tests run successfully before committing changes
9. Optimize script performance by adding appropriate flags (e.g., --no-verify) when needed to prevent unnecessary failures
10. Ensure all tasks meet acceptance criteria as defined in [task_completion_criteria.md](task_completion_criteria.md):
    - All tests pass: `npm test`
    - Code formatting is correct: `npm run format:check`
    - Project builds successfully: `npm run build`
    - Code passes linting checks: `npm run lint`
