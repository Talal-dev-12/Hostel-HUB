import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export async function apiGet(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function apiPost(endpoint, body) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiPut(endpoint, body) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
  });
  return res.json();
}


export async function getAPI(api) {
  try{
    const res = await axios.get(api)
  return res.data;
  }catch(error){
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postAPI(api) {
  try{
    const res = await axios.post(api)
    return res.data;
  }catch(error){
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function putAPI(api , data) {
  try{
    const res = await axios.put(api,data)
    return res.data;
  }catch(error){
    console.error("Error fetching data:", error);
     throw error;
  }
}