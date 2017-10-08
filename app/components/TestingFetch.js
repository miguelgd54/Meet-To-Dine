import React from 'react';




class TestingFetch extends React.Component {
    testing() { 
        fetch("https://platform.otqa.com/sync/directory", {
            headers: {
              Authorization: "bearer 93f3db26-0929-4a96-9d27-3661cbbfb370"
            },
            method: "GET"
          })
          .then(fetch.throwErrors)
          .then(res => console.log(res.json()));
        }    
    render() {
        this.testing();
        return null;
    }
}

export default TestingFetch;