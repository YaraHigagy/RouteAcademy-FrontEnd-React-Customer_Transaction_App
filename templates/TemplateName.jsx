import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './TemplateName.module.css';

function TemplateName() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        
    }, []);

    return <>
        <h2>TemplateName</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default TemplateName