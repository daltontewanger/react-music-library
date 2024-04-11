const fetchSearch = async (term) => {
  const url = encodeURI(`https://itunes.apple.com/search?term=${term}`);
  document.title = `${term} Music`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data.results
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result = "";
  let suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
  };
};

export const createResource = (term) => {
  return {
    result: wrapPromise(fetchSearch(term)),
  };
};
