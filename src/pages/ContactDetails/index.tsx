import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form, useLoaderData, useParams } from 'react-router-dom';
import { contactDetailsLoader } from '../../api/endpoints/contacts/loaders';
import ContactForm from '../../components/_forms/ContactForm';
import useGetContact from '../../hooks/queries/contacts/useGetContact';

const ContactDetails = () => {
  const params = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof contactDetailsLoader>>
  >;
  const { data: contactDetails } = useGetContact(
    params.id as string,
    initialData,
  );

  return (
    <div className="d-flex flex-column">
      <Row className="mb-5 align-items-center">
        <Col>
          <h3>{contactDetails?.name}</h3>
          <h4>#{contactDetails?.id}</h4>
        </Col>
        <Col className="text-end">
          <Form
            method="delete"
            onSubmit={(event) => {
              if (
                !window.confirm('Do you really want to delete this contact?')
              ) {
                event.preventDefault();
              }
            }}
          >
            <Button
              data-testid="deleteContactBtn"
              name="intent"
              type="submit"
              value="delete"
              variant="outline-danger"
            >
              Delete contact
            </Button>
          </Form>
        </Col>
      </Row>

      <ContactForm contactDetails={contactDetails} />
    </div>
  );
};

export default ContactDetails;
