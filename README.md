# GraphQL Server on Cloud Run

Quick example of running Apollo GraphQL server on Cloud Run.

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

## Steps to reproduce

1. Create a `package.json` via `npm init -y`
2. Install the libraries needed via `npm i apollo-server-express express graphql`
3. (Optional) Modify the `index.js` to use something other than dummy data included
4. Make sure the `package.json` has a `start` script pointing to `index.js` <- Cloud Run will need this to start the server
5. Deploy with Cloud run: `gcloud run deploy graphqlserver --source . --region us-central1 --allow-unauthenticated`
6. Query!


### Example

```
$ gcloud beta run deploy graphqlserver --source . --region us-central1 --allow-unauthenticated
This command is equivalent to running `gcloud builds submit --pack image=[IMAGE] .` and `gcloud run deploy graphqlserver --image [IMAGE]`

Building using Buildpacks and deploying container to Cloud Run service [graphqlserver] in project [testingproject] region [us-central1]
✓ Building and deploying... Done.                                                                                         
  ✓ Uploading sources...                                                                                                  
  ✓ Building Container... Logs are available at [https://console.cloud.google.com/cloud-build/builds/bb7fac20-1beb-440e-ae
  4f-aa082b4f2c27?project=308690897031].                                                                                  
  ✓ Creating Revision...                                                                                                  
  ✓ Routing traffic...                                                                                                    
  ✓ Setting IAM Policy...                                                                                                 
Done.                                                                                                                     
Service [graphqlserver] revision [graphqlserver-00004-jim] has been deployed and is serving 100 percent of traffic.
Service URL: https://graphqlserver-syxxxx-uc.a.run.app

$ curl -X POST -d '{"query": "query { countries { name code } }" }' https://graphqlserver-syxxxx-uc.a.run.app/graphql -H "content-type: application/json" -sS | jq .
{
  "data": {
    "countries": [
      {
        "name": "Canada",
        "code": "CA"
      },
      {
        "name": "United States",
        "code": "US"
      }
    ]
  }
}
```


