function fetchMessage(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("request failed"));
        return;
      }

      resolve({
        message: "data loaded successfully"
      });
    }, 10);
  });
}

async function loadMessage() {
  const result = await fetchMessage();
  return result.message;
}

module.exports = {
  fetchMessage,
  loadMessage
};
