import React, { Component } from 'react';
import axios from 'axios';
import { GlobalStyle } from './GlobalStyle';
import { Appstyled } from './Appstyled';
import { ImSpinner } from 'react-icons/im';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        console.log(`Fetching images for query: "${query}" on page: ${page}`);
        const response = await axios.get(
          `/?key=43582333-b71aa2f7f7d4d82dcec6d74cc&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
        );
        console.log(response.data);
        this.setState(prevState => ({
          images: page === 1 ? response.data.hits : [...prevState.images, ...response.data.hits],
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    this.setState({
      query: newQuery,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    console.log('Load More clicked');
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  
  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { images, isLoading, showModal } = this.state;
    return (
      <Appstyled>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <div><ImSpinner size="32" /> Loading...</div>}
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && !isLoading && <Button onClick={this.handleLoadMore} />}
        {/* {showModal && <Modal onClick={this.toggleModal} />} */}
        <GlobalStyle />
      </Appstyled>
    );
  }
}



  // render() {
  //   const { images, status } = this.state;

  //     // <Appstyled>
  //       if (status === 'idle') {
  //       return <Searchbar onSubmit={this.handleSubmit} />;
  //       }

  //   if (status === 'pending') {
  //     return
  //     <>
  //       <h1>Loading...</h1>
  //       <div><ImSpinner size="32" />Loading...</div>
  //     </>   
  //       }

    //     if(status === regected) {
    //       return <p>Error</p>
    //     }
    
    // if (status === resolved) {
    //   return <ImageGallery images={images} />
    // }
      // </Appstyled> 
// }



// Your API key: 43582333-b71aa2f7f7d4d82dcec6d74cc
