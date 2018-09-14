## Running the development server
```
npm run start
```
This will open the local dev server on port 4200. You can navigate then to http://localhost:4200/content/we-retail-journal/angular/home.html

### GOTCHA's - you should read this

#### Your requests to AEM are failing
Most probably this is due to CORS rejection, so you might want to either config AEM to accept CORS or bypass it from the browser if you are doing local development.  
**Also** make sure you login in AEM instance in the same browser.

#### Your images don't show up
Most probably the images are having relative paths, and because we are not on AEM they won't exist on this server.
Quick fix would be to force the AEM absolute path on the images from the image component

## Running the local NODE.js Server Side Rendering.  
In order to get the server side rendering to work run the following commands
```
npm run build:ssr
```
then 
```
npm run serve:ssr
```

This will open a server on port 4000 so you can navigate to http://localhost:4000/content/we-retail-journal/angular/home.html to see the running example

### GOTCHA's - you should read this

For now we need to overcome some technical difficulties in order to get the server actually working.

#### Authorize your requests
If you see that your requests are failing most probably the requests are not authorized.  
You should modify the `PageModelManager#fetchModel` method to add the `Authorization` header:
[here](https://git.corp.adobe.com/CQ/spa-page-model-manager/blob/development/src/PageModelManager.js#L511)
you should add the following header:
```
xhr.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4=');
```

#### Your client side code routing is failing
Most probably this is due to CORS rejection, so you might want to either config AEM to accept CORS or bypass it from the browser if you are doing local development.

#### Your images don't show up
Most probably the images are having relative paths, and because we are not on AEM they won't exist on this server.  
Quick fix would be to force the AEM absolute path on the images from the image component
