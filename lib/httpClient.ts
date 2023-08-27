import axios from "axios";

async function GET(url: string) {
  const {data} = await axios.get(url);
  return data;
}


async function POST(url: string, payload: any) {
  const {data} = await axios.post(url, payload);
  return data;
}

const httpClient = {GET, POST}

export default httpClient