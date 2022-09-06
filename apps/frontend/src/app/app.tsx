import {useEffect, useState} from "react";
import {AppApi, ExampleResponse} from "@openapi-backend-frontend-example/backend-client/api";
import {useApi} from "./useApi";

export function App() {
  const api = useApi()

  const [response, setResponse] = useState<ExampleResponse | undefined>(undefined)

  useEffect(() => {
    const appApi = new AppApi(undefined, "http://localhost:3333", api)
    appApi.example({stringAttribute: "example", dateAttribute: new Date()}).then(r => {
      setResponse(r.data)
    })
  }, [])

  if (!response) {
    return <></>
  }

  return (
    <div>
      {`${response.stringAttribute} - ${response.dateAttribute.toISOString()}`}

    </div>
  );
}

export default App;
