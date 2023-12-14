// add the contents for your components to be recognised by tailwind
// your config file should look like this

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        // we've added our own colour that maps to Payload's css variable so we can re-use the same theme styling!
        error: 'var(--theme-error-400)',
      },
    },
  },
  plugins: [],
}
