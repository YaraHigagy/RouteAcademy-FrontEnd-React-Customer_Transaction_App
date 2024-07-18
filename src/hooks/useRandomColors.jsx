import { useState, useEffect } from 'react';

function useRandomColors() {
    const [color, setColor] = useState('');

    const colors = ['teal', 'tomato', 'olive', 'rose', 'brown', 'purple', 'beige', 'chocolate', 'darkgreen', 'midnightblue'];

    useEffect(() => {
        // Initialize with a random color on first render
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    }, [colors]);

    return {color, setColor};
}

export default useRandomColors;
