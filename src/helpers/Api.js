import toastr from "toastr";
import fetchHelper from "./FetchHelper";
import { debounced } from "@/utils/commonOperator";
import authDispatcher from "@/module/auth/action";

export const API_URL = process.env.REACT_APP_API_ROOT;

const Api = {
  async get(url, params, headers, showError) {
    url = createUrl(url, params);
    return await request(url, { params, headers, showError });
  },

  async post(url, body, params, headers, showError, isFormSubmit) {
    url = createUrl(url, params);
    return await request(url, {
      method: "POST",
      body,
      headers,
      showError,
      isFormSubmit,
    });
  },

  async put(url, body, params, headers, showError, isFormSubmit) {
    url = createUrl(url, params);
    return await request(url, {
      method: "PUT",
      body,
      headers,
      showError,
      isFormSubmit,
    });
  },

  async delete(url, params, headers, showError) {
    url = createUrl(url, params);
    return await request(url, { method: "DELETE", params, headers, showError });
  },
};

export default Api;

const createUrl = (url, params) => {
  const args = [];
  for (const key in params) {
    if (
      params.hasOwnProperty(key) &&
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      const value = params[key];
      args.push(`${key}=${value}`);
    }
  }
  url = args.length > 0 ? url + "?" + args.join("&") : url;
  return API_URL + url;
};

const request = async (
  url,
  {
    method = "GET",
    params,
    body,
    headers,
    showError = true,
    isFormSubmit = false,
  }
) => {
  try {
    // trim search param
    if (body && typeof body.search === "string")
      body.search = body.search.trim();
    const config = { method };
    if (body) {
      if (body instanceof FormData) {
        config.body = body;
      } else config.body = JSON.stringify(body);
    }
    if (headers) config.headers = headers;
    const [data, status] = await fetchHelper.fetch(url, config, isFormSubmit);

    // eslint-disable-next-line no-useless-concat
    if (status === UNAUTHORIZED_CODE) {
      debounced(() => {
        authDispatcher.logout(true);
        toastr.error("Token was expired!");
      }, 3000);
      return { status };
    }
    let result = data instanceof Blob ? data : data.data;

    if (SUCCESS_CODE.includes(status)) return { result, status };

    showError &&
      toastr.error(
        data.Message ||
          data.message ||
          (status === 403 && "Permission denied") ||
          "Something went wrong"
      );
    return { result: null, message: data.message, status };
  } catch (exception) {
    console.log("exception: ", exception);
  }
};

const SUCCESS_CODE = [200, 201, 204];
const UNAUTHORIZED_CODE = 401;

// /**
//  * https://github.com/Rob--W/cors-anywhere
//  */
// const geoUrl = "https://www.sglocate.com/api/json/searchwithpostcode.aspx";
// const proxy = " https://cors-anywhere.herokuapp.com/";
