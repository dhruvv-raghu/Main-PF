module.exports = {
  dependencyTypes: ['dependencies', 'devDependencies', 'peerDependencies'],
  semverGroups: [
    {
      // Ensure Next.js, React, and React DOM versions are consistent
      dependencies: ['next', 'react', 'react-dom'],
      dependencyTypes: ['dependencies'],
      packages: ['*'],
      isSemver: true,
    },
    {
      // Ensure Tailwind CSS, Prettier, ESLint, and TypeScript are consistent
      dependencies: ['tailwindcss', 'eslint', 'prettier', 'typescript'],
      dependencyTypes: ['devDependencies'],
      packages: ['*'],
      isSemver: true,
    }
  ]
};

