import { getProviders, signIn } from 'next-auth/client'

export default function SignIn({ providers }) {
    return (
      <>
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
                <button onClick={() => signIn(provider.id, {
                    redirect: false,
                    user: {
                        fullName: "Tushar",
                        accountType: "normal",
                        mobile: "01864510094",
                        email: "tushar27156@gmail.com"
                    }
                })}>Sign in with {provider.name}</button>
            </div>
          ))}
      </>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context){
    const providers = await getProviders()
    return {
        props: { providers }
    }
}