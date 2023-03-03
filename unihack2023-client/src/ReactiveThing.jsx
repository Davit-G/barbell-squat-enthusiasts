import React, { useState, useEffect } from 'react';

function ReactiveThing({ text, count, count2, count3 }) {

    useEffect(() => {
        console.log("osidjasdi joqwejif coisdhf oidovi oai o");
    }, [count, count3])

    useEffect(() => {
        console.log('THE SECOND VARIABLE:', count);
    }, [count2])

    return (
        <div>
            <h1>Reactive Thing</h1>
            <p>{count} {count2} {count3}</p>
        </div>
    );
}

export default ReactiveThing;