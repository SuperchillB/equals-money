import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <Container
      className="d-flex align-items-center justify-content-center h-100"
      fluid
    >
      {isRouteErrorResponse(error) && (
        <Row className="flex-column justify-content-center text-center">
          <Col>
            <h1 className="display-1 fw-bold">{error.status}</h1>
          </Col>
          <Col>
            <h3>{error.statusText}</h3>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Error;
