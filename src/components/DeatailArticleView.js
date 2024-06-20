// DetailArticleView.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const DetailArticleView = ({ article }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h1>{article.title}</h1>
            <img src={article.urlToImage} alt={article.title} className="img-fluid" />
            <p>{article.content}</p>
            {article.urlToVideo && <video controls src={article.urlToVideo} className="img-fluid"></video>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailArticleView;
