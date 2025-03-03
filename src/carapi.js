export async function fetchCars() {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Error fetching cars: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in fetchCars:", error);
    throw error;
  }
}

export async function deleteCar(url) {
  try {
    const response = await fetch(url, { method: "DELETE" });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Error deleting car: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in deleteCar:", error);
    throw error;
  }
}

export async function saveCar(newCar) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Error saving car: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in saveCar:", error);
    throw error;
  }
}

export async function updateCar(url, updatedCar) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Error updating car: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in updateCar:", error);
    throw error;
  }
}
