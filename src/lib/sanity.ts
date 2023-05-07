import {createClient} from "next-sanity";

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: '2021-10-21',
    useCdn: true
})

export default client;