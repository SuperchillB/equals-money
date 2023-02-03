import { useState } from 'react';
import {
  Button,
  Col,
  Figure,
  Form as BootstrapForm,
  Image,
  Row,
} from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { ContactDTO } from '../../../_types/api/contacts/Contact';
import styles from './ContactForm.module.scss';
import request from '../../../api/request';

type ContactFormProps = {
  contactDetails?: ContactDTO;
};

const ContactForm = ({ contactDetails }: ContactFormProps) => {
  const [validated, setValidated] = useState(false);
  const [avatar, setAvatar] = useState(contactDetails?.avatar ?? '');

  const fileUploadHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    const file = files ? files[0] : ({} as File);
    setAvatar(file?.name);

    const formData = new FormData();
    formData.append('file', file as Blob);

    const response = await request({
      baseUrl: 'https://httpbin.org',
      path: '/post',
      args: {
        method: 'POST',
        body: file,
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`,
        },
      },
    });

    setAvatar(response.data);
  };

  const handleSubmit = (event: React.FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <BootstrapForm
      as={Form}
      className="w-100"
      method="post"
      id="contact-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row>
        <Col className={styles.avatarColumn} md={5}>
          <fieldset>
            <span className={styles.avatarWrapper}>
              {contactDetails?.avatar ? (
                <Image className={styles.avatar} src={avatar} />
              ) : (
                <Figure className={styles.avatar}>
                  <Figure.Image
                    src={
                      avatar ||
                      'https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg'
                    }
                  />
                </Figure>
              )}
            </span>
            <BootstrapForm.Group controlId="newContactForm.avatar">
              <BootstrapForm.Control
                aria-label="File upload"
                onChange={fileUploadHandler}
                name="file"
                type="file"
              />
            </BootstrapForm.Group>
          </fieldset>
        </Col>
        <Col>
          <div className={styles.contactForm}>
            <fieldset>
              <BootstrapForm.Group
                className="mb-3"
                controlId="newContactForm.avatar"
              >
                <BootstrapForm.Label>Avatar URL</BootstrapForm.Label>
                <BootstrapForm.Control
                  aria-label="Avatar URL"
                  name="avatar"
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  required
                  type="text"
                  value={avatar}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  Please choose a username.
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
              <BootstrapForm.Group
                className="mb-3"
                controlId="newContactForm.name"
              >
                <BootstrapForm.Label>Name</BootstrapForm.Label>
                <BootstrapForm.Control
                  aria-label="Name"
                  defaultValue={contactDetails?.name ?? ''}
                  name="name"
                  placeholder="John Doe"
                  required
                  type="text"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  Please choose a name.
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
              <BootstrapForm.Group
                className="mb-3"
                controlId="newContactForm.email"
              >
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <BootstrapForm.Control
                  aria-label="Email"
                  defaultValue={contactDetails?.email ?? ''}
                  name="email"
                  placeholder="johndoe@email.com"
                  required
                  type="email"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  Please choose a valid email.
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
              <BootstrapForm.Group
                className="mb-3"
                controlId="newContactForm.phone"
              >
                <BootstrapForm.Label>Phone</BootstrapForm.Label>
                <BootstrapForm.Control
                  aria-label="Phone"
                  defaultValue={contactDetails?.phone ?? ''}
                  name="phone"
                  pattern="^[0-9]*$"
                  placeholder="07123456789"
                  required
                  type="tel"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  Please enter a valid phone number.
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
              <BootstrapForm.Group
                className="mb-3"
                controlId="newContactForm.birthday"
              >
                <BootstrapForm.Label>Birthday</BootstrapForm.Label>
                <BootstrapForm.Control
                  aria-label="Birthday"
                  defaultValue={contactDetails?.birthday ?? ''}
                  name="birthday"
                  pattern="^\d{2}\/\d{2}\/\d{4}$"
                  placeholder="01/12/1980"
                  required
                  type="text"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  Please enter your birthday.
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
              <Button
                className="mt-5"
                name="intent"
                type="submit"
                value="update"
                variant="primary"
              >
                Save changes
              </Button>
            </fieldset>
          </div>
        </Col>
      </Row>
    </BootstrapForm>
  );
};

export default ContactForm;
