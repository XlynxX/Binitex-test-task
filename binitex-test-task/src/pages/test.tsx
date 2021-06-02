import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';
let covidDATA: any;

const redirect = () => {
  return (
    <Redirect to='/'></Redirect>
  );
}

class test extends Component {

  constructor(props) {
    super(props);
    console.log('constructor');
    if (this.props.location.state == undefined) {
      this.render = redirect;
      this.render();
      return;
    }
    covidDATA = JSON.parse(this.props.location.state.records);

    for (let index = 0; index < covidDATA.length; index++) {
      const element = covidDATA[index];
      //console.log(element)
    }
  }
  render() {
    return (
      <div>
        <h1>Данные по ковиду:</h1>
        <div>
          <table>
            <thead>
              <tr>{ 'this.getHeader()' }</tr>
            </thead>
            <tbody>
            { 'this.getRowsData()' }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default test;