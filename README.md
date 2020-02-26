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

~~I. Use different env files~~ - this violates the 12-factor's rule on [Config](https://12factor.net/config) 
   
   1. Create a .env file in the root dir (not in src/)
   
   2. Add any variables with the prefix `REACT_APP_`. Example:
   
   ```
   # in .env
   REACT_APP_GATEWAY_URL=https://some-gateway-url
   ```
   
   3. Add more .env files (different environments)
   
   ```
   # .env
   REACT_APP_GATEWAY_URL=https://some-gateway-url
   
   # .env.local
   REACT_APP_GATEWAY_URL=http://localhost:8080
   ```
   
   4. Rerun your app with the .env file you want
   
   ```bash
   yarn start .env
   # or
   yarn start .env.local
   ```
   
   5. Create custom app scripts in your package.json
   
   ```json
   {
   "scripts": {
       "start": "react-scripts start",
       "start-local": "react-scripts start .env.local" 
     }
   }
   ```
II. Pass in env variables on build

You can pass it in through IntelliJ run config