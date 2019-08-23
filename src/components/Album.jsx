import React from 'react';

class Album extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const headers = new Headers();
        const header = {
            method: 'GET',
            headers,
            mode: 'cors',
            cache: 'default'
        }
        fetch('http://127.0.0.1:4100/', header)
            .then((res) => res.json())
            .then((record) => {
                console.log(record);
            })
            .catch(err => {
                console.log('Error: ', err)
            })
    }

    render() {
        return(
            <div>
                <h1>Hello from Album</h1>
            </div>
            
        );
    }
}

export default Album;