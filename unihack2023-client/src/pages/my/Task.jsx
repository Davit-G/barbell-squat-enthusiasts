import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Task() {
    let query = useQuery();

    return (<>{query.get("taskId")}</>);
}

export default Task;