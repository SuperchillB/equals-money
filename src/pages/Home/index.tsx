import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import { contactListLoader } from '../../api/endpoints/contacts/loaders';
import useGetContacts from '../../hooks/queries/contacts/useGetContacts';
import styles from './Home.module.scss';

const Home = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof contactListLoader>>
  >;
  const { data: contacts } = useGetContacts(initialData);

  return (
    <div>
      <Row className="justify-content-between mb-5">
        <Col>
          <h3>List of contacts</h3>
        </Col>
        <Col className="text-end">
          <Link to="/contacts/new">
            <Button
              data-testid="createContactBtn"
              type="submit"
              variant="primary"
            >
              Create new contact
            </Button>
          </Link>
        </Col>
      </Row>
      <Row xs={2} md={4}>
        {contacts?.map((contact) => (
          <Col data-testid="contactCard" key={contact.id}>
            <Card
              border="light"
              className={`${styles.card} mb-4 pt-3 shadow-sm`}
            >
              <span className={`${styles.cardImgWrapper} mx-auto`}>
                <Card.Img
                  className={styles.cardImg}
                  src={contact.avatar}
                  variant="top"
                />
              </span>
              <Card.Body className="text-center">
                <Card.Title className="py-3">{contact.name}</Card.Title>
                <Link to={`contacts/${contact.id}`}>
                  <Button size="sm" variant="outline-primary">
                    See details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
