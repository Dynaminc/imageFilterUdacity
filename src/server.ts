import express from 'express';
import {Request, Response} fomr 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req:Request, res:Response ) => {
    res.send("Demilade's Udacity Project try GET /filteredimage?image_url={{}}")
  } );
  

//filter image endpoint
  app.get("/filteredimage", async (req, res)=>{
    const imageUrl:string = req.query.image_url.toString();
    if (!imageUrl){
      res.status(400).send('You need to add an imageurl as a parameter')
    }
    const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
    console.log(__dirname + outpath);
    const filteredImage = await filterImageFromURL(imageUrl);
    var path = require("path");
    res.status(200).sendFile(path.resolve(filteredImage), () => {
      deleteLocalFiles([filteredImage]);
    });
  });
  

  // Start the Server
  app.listen( port, () => {
      console.log( `Demilade's Udacity Project  server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();