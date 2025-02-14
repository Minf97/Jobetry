module.exports = {
  types: [
    { value: 'feat', name: 'feat:     ✨  New feature' },
    { value: 'fix', name: 'fix:      🐛  Bug fix' },
    { value: 'docs', name: 'docs:     📝  Documentation changes' },
    { value: 'style', name: 'style:    💄  Code style changes (no production code change)' },
    { value: 'refactor', name: 'refactor: ♻️   Code refactoring (no features or bugs)' },
    { value: 'perf', name: 'perf:     ⚡️  Performance improvements' },
    { value: 'test', name: 'test:     ✅  Adding tests' },
    { value: 'chore', name: 'chore:    🔨  Changes to the build process or tools' },
    { value: 'revert', name: 'revert:   ⏪️  Revert to a commit' },
    { value: 'build', name: 'build:    📦️  Build related changes' },
    { value: 'ci', name: 'ci:       👷  CI related changes' }
  ],
  scopes: [
    { name: 'ui' },
    { name: 'test' },
    { name: 'config' },
    { name: 'auth' },
    { name: 'deps' },
    { name: 'ci' }
  ],
  messages: {
    type: 'Select the type of change that you\'re committing:',
    customScope: 'Denote the scope of this change (optional):',
    subject: 'Write a short description:',
    body: 'Provide a longer description (optional). Use "|" to break new line:',
    footer: 'List any issues closed (optional). E.g.: #31, #34:',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },
  skipQuestions: ['breaking'],
  allowCustomScopes: true,
  subjectLimit: 100
} 