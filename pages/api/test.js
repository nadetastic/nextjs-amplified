import { withSSRContext, Auth } from "aws-amplify"

export default async function handler(req, res) {
    const { Auth } = withSSRContext({ req })

    let data;

    try {
        console.log('before')
        data = await Auth.currentAuthenticatedUser()
        console.log('after')
    } catch(e){
        data = e
    }

    res.status(200).json(data)
}