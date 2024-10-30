export function fetchCars() {
  return fetch(import.meta.env.VITE_API_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + response.statusText);

    return response.json();
  });
}

export function deleteCar(url) {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);

    return response.json();
  });
}

export function saveCAr(newCAr) {
  fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCAr),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);

    return response.json();
  });
}

export function updateCar(url, updatedCar) {
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCar),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in updating: " + response.statusText);

    return response.json();
  });
}
