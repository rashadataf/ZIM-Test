# ZIM Connections challenge :man_technologist: :woman_technologist:

Hello there!

I was so happy to take such a test.
It was a challenging test.
The hardest part was planning how to show off my skills.

## How To Use

- clone the repo to your local and **cd** to cloned folder
  
```bash
git clone https://github.com/rashadataf/ZIM-Test.git

cd ZIM-Test/
```

- you will find two folders *server* and *client*
- now you have to install dependencies in both folders

```bash
cd server/
yarn install

cd ../client/
yarn install
```

- now for the back-end you will find **.env.example** file inside *server/* , you need to rename this file to become **.env**

```bash
cd server/
cp .env.example .env
```

- now inside **.env** file you will find two fields
  - **PORT** which represents the port where the *express* server will listen to.
  it is set by default to be *3500*
  - **MONGODB_URL** which is the connection string for the MongoDB.
  you have to set it. *ex: mongodb://localhost:27017/zim-test*

- now after seting the enviroment variables we are ready to **build** and **start** server.

```bash
cd server/
yarn run dev
```

- or if you want to run in production mode

```bash
cd server/
yarn run build
yarn start
```

- if you want to run tests, after starting the dev server

```bash
yarn test
```

- for the client we only need to update url of api if we changed the port to be something different from *3500*
- you will find **config** file for the client inside *client/src/config* folder
- In that folder you will see **apiUrls** file which contains two constants
  - REMOTE_URL for the public api
  - LOCAL_URL for the local server we have

- After setting this constants we are ready to start our client

```bash
cd client/
yarn start
```

## API Endpoints

## Add Chunk To Favorite

  Saves a chunk as a favorite under a specific user.

- **URL**

  `/api/chunks`

- **Method:**

  `POST`
  
- **URL Params**
  None

- **Data Params**
  - `email: String`
  - `url: String`
  - `value: String`
  - `icon_url: String`
  - `id: String`

- **Success Response:**
  - **Code:** 200
  - **Content:** `{ message : "chunk added successfully to favorites!" }`

- **Error Response:**
  - **Code:** 400
  - **Content:** `{ error : error.message }`

- **Sample Call:**

  ```javascript
    const result = await axios.post(`${LOCAL_URL}/api/chunks`, {
        email: email,
        url: url,
        value: value,
        icon_url: icon_url,
        id: id,
      });

      console.log(result.data);
  ```

## Remove Chunk From Favorite

  Removes a chunk from favorites of a user.

- **URL**

  `/api/chunks`

- **Method:**

  `DELETE`
  
- **URL Params**
  - `email`
  - `id`

- **Data Params**
  None

- **Success Response:**
  - **Code:** 200
  - **Content:** `{ message : "Chunk was removed from your favorite list" }`

- **Error Response:**
  - **Code:** 404
  - **Content:** `{message: "email or chunk wer not found in the database!"}`

- **Sample Call:**

  ```javascript
    const result = await axios.delete(
        `${LOCAL_URL}/api/chunks?email=${email}&id=${id}`
      );

    console.log(result.data);
  ```

## Get Favorite Chunks

  Returns an array of favorite chunks for a specific user.

- **URL**

  `/api/chunks`

- **Method:**

  `GET`
  
- **URL Params**
  - `email`

- **Data Params**
  None

- **Success Response:**
  - **Code:** 200
  - **Content:** `{ chunks : [Array Of Chunks] }`

- **Error Response:**
  - **Code:** 400
  - **Content:** `{error: error.message}`

- **Sample Call:**

  ```javascript
    const result = await axios.get(`${LOCAL_URL}/api/chunks?email=${email}`);

    console.log(result.data);
  ```

## Update Favorite Chunk

  Changes the content of favorite chunk text in database

- **URL**

  `/api/chunks`

- **Method:**

  `PUT`
  
- **URL Params**
  None

- **Data Params**
  - `email`
  - `id`
  - `text`

- **Success Response:**
  - **Code:** 200
  - **Content:** `true || false`

- **Error Response:**
  - **Code:** 404
    - **Content:** `{ message: "can't find chunk!" }`
  - **Code:** 400
    - **Content:** `{ message: error.message }`

- **Sample Call:**

  ```javascript
    const result = await axios.put(`${LOCAL_URL}/api/chunks`, {
        email: email,
        text: text,
        id: id,
      });
      
    console.log(result.data);
  ```

## Is Chunk Favorite

  Checks whether a chunk is a favorite for a specific user or not.

- **URL**

  `/api/chunks/isFavourite`

- **Method:**

  `POST`
  
- **URL Params**
  None

- **Data Params**
  - `email`
  - `id`

- **Success Response:**
  - **Code:** 200
  - **Content:** `true || false`

- **Error Response:**
  - **Code:** 400
  - **Content:** `false`

- **Sample Call:**

  ```javascript
    const result = await axios.post(`${LOCAL_URL}/api/chunks/isFavourite`, {
        email,
        id,
      });

    console.log(result.data);
  ```

## Extra points

- I have successfully deployed the project on *digitalocean* vps

- you can see live version on [here](http://167.99.115.66/)
  