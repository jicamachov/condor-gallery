import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouterSite from './RouterSite';
import Header from './Header';
import Sidebar from './Sidebar';



class App extends React.Component { 

  constructor(props){
    super(props);

    this.state = {
      title: 'Home'
    }
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
  }

  handleOnChangeTitle(e) {
    this.setState({title: e.target.title});
  }

  render() {
    return (
      <Router>
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <Header title={this.state.title} />
          <Sidebar onChangeTitle={this.handleOnChangeTitle}/>
          <main className="mdl-layout__content mdl-color--grey-100">
            <RouterSite />
          </main>        
      </div>
      </Router>
    );
  }
 
}

export default App;
