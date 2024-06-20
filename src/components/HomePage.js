// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, DropdownButton, Dropdown, Pagination } from 'react-bootstrap';
import { fetchNewsArticles, setPage } from '../features/newSlice';
import DetailArticleView from './DeatailArticleView'; // Adjust the import path as necessary

const HomePage = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  const status = useSelector((state) => state.news.status);
  const currentPage = useSelector((state) => state.news.currentPage);
  const [category, setCategory] = useState('general');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    dispatch(fetchNewsArticles({ category, page: currentPage }));
  }, [category, currentPage, dispatch]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    dispatch(setPage(1)); // Reset to first page when category changes
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="container">
      <h1>Latest News</h1>
      <DropdownButton id="category-dropdown" title="Select Category" className='mt-5 mb-5' onSelect={handleCategoryChange}>
        <Dropdown.Item eventKey="general">General</Dropdown.Item>
        <Dropdown.Item eventKey="business">Business</Dropdown.Item>
        <Dropdown.Item eventKey="technology">Technology</Dropdown.Item>
        <Dropdown.Item eventKey="entertainment">Entertainment</Dropdown.Item>
      </DropdownButton>
      <div className="row">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>Error fetching articles</p>}
        {articles.map((article) => (
          <Card key={article.url} style={{ width: '18rem' }} onClick={() => handleArticleClick(article)}>
            <Card.Img variant="top" src={article.urlToImage} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
              <Button variant="primary">Read more</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination className="mt-5">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
      {selectedArticle && <DetailArticleView article={selectedArticle} />}
    </div>
  );
};

export default HomePage;
