# dog-app (api example)

1. Create react app

2. Install axios

```bash
yarn add axios
```

3. Import axios

```bash
import axios from 'axios'
```

4. You can now use axios requests as per here:

https://github.com/axios/axios

Examples:

```js
axios.get('https://someUrl.com').then(response => console.log(response.data))
```

### Adding ENV files, and env variables

When using env variables (for example, for URLs), you can use the following:

1. Create a .env file in the root dir (not in src/)

2. Add any variables with the prefix `REACT_APP_`. Example:

```
# in .env
REACT_APP_GATEWAY_URL=http://localhost:8080
```

3. Rerun your app with the .env file you want

```bash
yarn start .env
# or
yarn start .env.local
```

4. Create custom app scripts in your package.json

```json
{
"scripts": {
    "start": "react-scripts start",
    "start-local": "react-scripts start .env.local" 
  }
}
```
