import React, { Component } from 'react';
import Photos from "./photos"


export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Cloudinary Practice</h1>
        <h2>Photo Uploader</h2>
        <Photos />
      </div>
    );
  }
}