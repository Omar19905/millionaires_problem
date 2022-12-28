import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";

const activeChainId = ChainId.Goerli;

function MyApp({Component, pageProps}) {
    return (
        <ThirdwebProvider desiredChainId={activeChainId}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </ThirdwebProvider>
    )
}

export default MyApp