module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        fontSize: {
            xs: ['10px', '10px'],
            sm: ['12px', '12px'],
            base: ['14px', '14px'],
            lg: ['18px', '18px'],
            xl: ['22px', '22px'],
          }
    },
    plugins: [
        function ({ addVariant }) {
            addVariant(
                'supports-backdrop-blur',
                '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))',
            );
            addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)');
            addVariant('children', '& > *');
            addVariant('scrollbar', '&::-webkit-scrollbar');
            addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
            addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');
        },
    ],
    variants: {
        extend: {
            backgroundColor: ['even'],
        }
    },
}
