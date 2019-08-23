import React from 'react';
import Image from './Image'
import Header from './Header';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
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
                record.data.forEach(element => {
                    element.photos.forEach(photo => {
                        const photos = this.state.photos;
                        photos.push(photo);
                        this.setState({ photos: photos });
                    });
                });
            })
            .catch(err => {
                console.log('Error: ', err)
            })
    }

    render() {
        const element = this.state.photos.map(record => <Image key={record._id} caption={record.caption} path={'http://127.0.0.1:4100/' + record.path} />)
        return (
            <div>
            <div className="pure-g">
                {element}
            </div>
            </div>
           
        );
    }
}

export default Home;