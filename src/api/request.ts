import { API_BASE_URL } from '../constants/api';
import { APIRequestParams } from '../_types/api';

/**
 * Executes API request given a specific url and arguments
 * @param baseUrl {String}    Base URL
 * @param path {String}       Url to be fetched from
 * @param args {Object}       Fetch configuration (such as method, headers, req body, ...)
 * @returns                   Response body
 */
const request = async ({
  baseUrl = API_BASE_URL,
  path,
  args,
}: APIRequestParams) => {
  // Create fetch aborter and attach it to promise
  const controller = new AbortController();
  const { signal } = controller;
  // Set timeout for long pending fetch
  setTimeout(() => controller.abort(), 30000);
  const promise = await fetch(baseUrl + path, { ...args, signal });
  if (!promise.ok) {
    const errorBody = await promise?.json();
    return Promise.reject(errorBody);
  }
  const body = await promise.json();

  return body;
};

export default request;
