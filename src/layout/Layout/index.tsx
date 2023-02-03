import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../Header';
import styles from './Layout.module.scss';

const Layout = () => {
  const navigation = useNavigation();

  const isNormalLoad =
    navigation.state === 'loading' && navigation.formData == null;

  const isReloading =
    navigation.state === 'loading' &&
    navigation.formData != null &&
    navigation.formAction === navigation.location.pathname;

  const isRedirecting =
    navigation.state === 'loading' &&
    navigation.formData != null &&
    navigation.formAction !== navigation.location.pathname;

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Header />
      {/* More layouts can be imported here (eg: LoggedInLayout, LoggedOutLayout, ToastAlerts, ... etc) */}
      <Container className="mt-5">
        {isNormalLoad || isReloading || isRedirecting || isSubmitting ? (
          <div className={styles.loading}>
            <Spinner animation="grow" />
          </div>
        ) : (
          <Outlet />
        )}
      </Container>
    </>
  );
};

export default Layout;
