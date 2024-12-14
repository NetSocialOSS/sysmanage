let links = [];
const getLinks = async () => {
  if (links.length) {
    return links;
  }
  let res = await fetch("/api/frontend/getRegisteredLinks", {
    method: "POST"
  });
  if (!res.ok) {
    throw new Error("Failed to fetch links");
  }
  links = await res.json();
  return links;
};
export {
  getLinks as g
};
