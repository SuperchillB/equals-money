import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ContactForm from '../../components/_forms/ContactForm';

const NewContact = () => {
  return (
    <div>
      <Row className="justify-content-start mb-5 w-100">
        <Col>
          <h3>Create a new contact</h3>
        </Col>
      </Row>
      <div className="d-flex flex-column align-items-center">
        <ContactForm />
      </div>
    </div>
  );
};

export default NewContact;
