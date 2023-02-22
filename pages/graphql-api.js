import { withSSRContext } from 'aws-amplify';

const GraphQLAPI = (props) => {
    return ( <>
        <h1>GraphQL API</h1>
        <p>{props.authdata}</p>
    </> );
}


export async function getServerSideProps(context) {
    const { Auth } = withSSRContext(context);
    try {
        const user = await Auth.currentAuthenticatedUser();
        return {
            props: {
                authdata: JSON.stringify(user)
            }
        }
    } catch (err) {
        return {
            props: {
                authdata: JSON.stringify(err)
            }   
        }
    }
}
 
export default GraphQLAPI;